import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'ID of the user' })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 1, description: 'ID of the class' })
  @IsNotEmpty()
  @IsInt()
  class_id: number;

  @ApiProperty({ example: 1, description: 'Quantity of the class' })
  @IsOptional()
  @IsInt()
  quantity: number;
}
