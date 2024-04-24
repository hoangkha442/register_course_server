import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAttendanceDto {
  @ApiPropertyOptional({ example: 1, description: 'Updated ID of the course registration' })
  @IsInt()
  @IsOptional()
  registration_id?: number;

  @ApiPropertyOptional({ example: '2023-01-01T00:00:00.000Z', description: 'Updated date of attendance' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ example: 'Absent', description: 'Updated attendance status' })
  @IsString()
  @IsOptional()
  status?: string;
}
