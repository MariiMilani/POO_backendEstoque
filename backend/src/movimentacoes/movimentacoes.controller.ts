import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';

@ApiTags('movimentacoes')
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private movimentacoes: MovimentacoesService) {}

  @Get()
  listar() {
    return this.movimentacoes.listar();
  }

  @Post()
  criar(@Body() dados: CreateMovimentacaoDto) {
    return this.movimentacoes.criar(dados);
  }
}
