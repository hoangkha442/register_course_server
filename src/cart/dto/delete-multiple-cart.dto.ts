// dto/delete-multiple-cart.dto.ts
import { IsArray, IsInt } from 'class-validator';

export class DeleteMultipleCartDto {
  @IsArray()
  @IsInt({ each: true })
  cartIds: number[];
}
