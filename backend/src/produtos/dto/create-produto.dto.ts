import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ example: 'Coca-Cola 2L' }) // aparece na documentação
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome precisa ter ao menos 2 letras' })
  nome!: string;

  @ApiProperty({ example: 9.9 })
  @IsNumber({}, { message: 'O preco precisa ser um número' })
  @IsPositive({ message: 'O preco precisa ser maior que zero' })
  preco!: number;

  @ApiProperty({ example: 10 })
  @IsInt({ message: 'A quantidade precisa ser um número inteiro' })
  @Min(0, { message: 'A quantidade não pode ser negativa' })
  quantidade!: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'O categoriaId precisa ser um número inteiro' })
  @IsPositive({ message: 'O categoriaId precisa ser maior que zero' })
  categoriaId!: number;
}
