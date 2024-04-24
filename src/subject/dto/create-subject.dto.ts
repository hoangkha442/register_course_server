import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Toán', description: 'Tên môn học' })
  @IsNotEmpty()
  @IsString()
  subject_name: string;

  @ApiProperty({ example: 'Toán 7 nâng cao', description: 'Mô tả môn học', required: false })
  @IsString()
  description?: string;
}
