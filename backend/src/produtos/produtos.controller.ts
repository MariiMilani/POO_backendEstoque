import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@ApiTags('produtos')
@Controller('produtos') // prefixo das rotas: /produtos
export class ProdutosController {
  constructor(private produtos: ProdutosService) {}

  @Get()
  listar() {
    return this.produtos.listar();
  }

  @Get(':id')
  buscarUm(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe: transforma "5" da URL em 5, e recusa "abc" (400)
    return this.produtos.buscarUm(id);
  }

  @Post()
  criar(@Body() dados: CreateProdutoDto) {
    return this.produtos.criar(dados);
  }
}
