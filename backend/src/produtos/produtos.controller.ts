import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private produtos: ProdutosService) {}

  @Get()
  listar() {
    return this.produtos.listar();
  }

  @Get(':id')
  buscarUm(@Param('id', ParseIntPipe) id: number) {
    return this.produtos.buscarUm(id);
  }

  @Post()
  criar(@Body() dados: CreateProdutoDto) {
    return this.produtos.criar(dados);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.produtos.remover(id);
  }
}
