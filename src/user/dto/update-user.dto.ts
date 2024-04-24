import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { users_role } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'example@gmail.com', description: 'The email address of the user' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'The new password for the user account' })
  @Length(6, 100)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'The full name of the user' })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiPropertyOptional({
    enum: users_role,
    example: users_role.hocVien,
    description: 'The role of the user',
  })
  @IsEnum(users_role)
  @IsOptional()
  role?: users_role;

  @ApiPropertyOptional({ example: '123456789', description: 'The phone number of the user' })
  @IsString()
  @IsOptional()
  @Length(7, 15)
  phone_number?: string;
  

  @ApiPropertyOptional({ example: '123 Main St', description: 'The address of the user' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'path/to/image.jpg', description: 'The path to the new profile picture of the user' })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class updateUserRole extends UpdateUserDto {
    @ApiProperty({ enum: users_role, enumName: 'users_role', description: 'Role of the user', example: users_role.hocVien })
    role: users_role;
}


