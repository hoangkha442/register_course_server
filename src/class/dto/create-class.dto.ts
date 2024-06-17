import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Mathematics 101', description: 'Name of the class' })
  @IsNotEmpty()
  @IsString()
  class_name: string;

  @ApiProperty({ example: 1, description: 'ID of the subject associated with the class', required: false })
  @IsOptional()
  @IsInt()
  subject_id?:  number;

  @ApiProperty({ example: 1, description: 'ID of the instructor associated with the class', required: false })
  @IsOptional()
  @IsInt()
  instructor_id?:  number ;

  @ApiProperty({ example: 'Monday 10:00-12:00', description: 'Schedule of the class' })
  @IsNotEmpty()
  @IsString()
  schedule: string;

  @ApiProperty({ example: 'Introduction to basic mathematics', description: 'Description of the class', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'abc.png', description: 'picture of the class', required: false })
  @IsOptional()
  @IsString()
  picture?: string;
}
