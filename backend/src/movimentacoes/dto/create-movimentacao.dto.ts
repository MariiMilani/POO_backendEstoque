import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

export class CreateMovimentacaoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'O produtoId é obrigatório' })
  @IsInt({ message: 'O produtoId precisa ser um número inteiro' })
  produtoId!: number;

  @ApiProperty({ enum: TipoMovimentacao, example: TipoMovimentacao.ENTRADA })
  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsEnum(TipoMovimentacao, { message: 'O tipo precisa ser ENTRADA ou SAIDA' })
  tipo!: TipoMovimentacao;

  @ApiProperty({ example: 5 })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @IsInt({ message: 'A quantidade precisa ser um número inteiro' })
  @Min(1, { message: 'A quantidade precisa ser maior que zero' })
  quantidade!: number;
}
