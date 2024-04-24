import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @ApiPropertyOptional({ example: 'Toán', description: 'Tên môn học' })
  @IsOptional()
  @IsString()
  subject_name?: string;

  @ApiPropertyOptional({ example: 'Toán 7 nâng cao', description: 'Mô tả môn học' })
  @IsOptional()
  @IsString()
  description?: string;
}
