import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module';
 @Module({
   imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CategoriasModule, ProdutosModule, MovimentacoesModule],
 })
 export class AppModule {}