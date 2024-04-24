import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({ example: 1, description: 'ID of the course registration' })
  @IsInt()
  @IsNotEmpty()
  registration_id: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Date of attendance' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'Present', description: 'Attendance status' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
