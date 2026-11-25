import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMovimentacaoDto,
  TipoMovimentacao,
} from './dto/create-movimentacao.dto';

@Injectable()
export class MovimentacoesService {
  constructor(private prisma: PrismaService) {}

  listar() {
    return this.prisma.movimentacao.findMany({
      orderBy: { criadoEm: 'desc' },
      include: {
        produto: {
          include: { categoria: { select: { id: true, nome: true } } },
        },
      },
    });
  }

  async criar(dados: CreateMovimentacaoDto) {
    return this.prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: { id: dados.produtoId },
      });
      if (!produto) {
        throw new NotFoundException(
          `Produto ${dados.produtoId} não encontrado`,
        );
      }

      const entrada = dados.tipo === TipoMovimentacao.ENTRADA;
      if (!entrada && dados.quantidade > produto.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente. Disponível: ${produto.quantidade}, solicitado: ${dados.quantidade}.`,
        );
      }

      await tx.produto.update({
        where: { id: produto.id },
        data: {
          quantidade: entrada
            ? { increment: dados.quantidade }
            : { decrement: dados.quantidade },
        },
      });

      return tx.movimentacao.create({
        data: dados,
        include: { produto: true },
      });
    });
  }
}
