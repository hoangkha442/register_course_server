// update-course-registration.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateCourseRegistrationDto {
  @ApiPropertyOptional({ example: 1, description: 'Updated Student ID' })
  @IsInt()
  @IsOptional()
  student_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Updated Class ID' })
  @IsInt()
  @IsOptional()
  class_id?: number;

  @ApiPropertyOptional({ example: '2023-01-01T00:00:00.000Z', description: 'Updated Registration Date' })
  @IsDateString()
  @IsOptional()
  registration_date?: string;

  @ApiPropertyOptional({ example: 'Completed', description: 'Updated Study Status' })
  @IsString()
  @IsOptional()
  study_status?: string;
}
  