import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  listar() {
    return this.prisma.produto.findMany({
      orderBy: { nome: 'asc' },
      include: { categoria: { select: { id: true, nome: true } } },
    });
  }

  async buscarUm(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: { select: { id: true, nome: true } } },
    });
    if (!produto) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }
    return produto;
  }

  async criar(dados: CreateProdutoDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: dados.categoriaId },
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoria ${dados.categoriaId} não encontrada`,
      );
    }
    return this.prisma.produto.create({
      data: dados,
      include: { categoria: { select: { id: true, nome: true } } },
    });
  }

  async remover(id: number) {
    await this.buscarUm(id);
    const movimentacoes = await this.prisma.movimentacao.count({
      where: { produtoId: id },
    });
    if (movimentacoes > 0) {
      throw new ConflictException(
        `O produto ${id} possui movimentações registradas`,
      );
    }
    return this.prisma.produto.delete({ where: { id } });
  }
}
