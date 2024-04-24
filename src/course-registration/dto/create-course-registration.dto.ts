// create-course-registration.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateCourseRegistrationDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty({ example: 1, description: 'Class ID' })
  @IsInt()
  @IsNotEmpty()
  class_id: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Registration Date' })
  @IsDateString()
  registration_date: string;

  @ApiProperty({ example: 'Enrolled', description: 'Study Status', required: false })
  @IsString()
  @IsOptional()
  study_status?: string;
}
