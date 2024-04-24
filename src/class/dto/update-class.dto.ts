import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateClassDto {
  @ApiPropertyOptional({ example: 'Mathematics 101', description: 'Updated name of the class' })
  @IsOptional()
  @IsString()
  class_name?: string;

  @ApiPropertyOptional({ example: 1, description: 'Updated ID of the subject associated with the class' })
  @IsOptional()
  @IsInt()
  @ValidateIf(o => o.subject_id !== null) // Validate if provided and not null
  subject_id?: number | null;

  @ApiPropertyOptional({ example: 1, description: 'Updated ID of the instructor associated with the class' })
  @IsOptional()
  @IsInt()
  @ValidateIf(o => o.instructor_id !== null) // Validate if provided and not null
  instructor_id?: number | null;

  @ApiPropertyOptional({ example: 'Monday and Wednesday 10:00-12:00', description: 'Updated schedule of the class' })
  @IsOptional()
  @IsString()
  schedule?: string;

  @ApiPropertyOptional({ example: 'Advanced topics in mathematics', description: 'Updated description of the class' })
  @IsOptional()
  @IsString()
  description?: string;
}
