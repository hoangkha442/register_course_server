import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { users_role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email of the user' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    enum: users_role,
    example: users_role.hocVien,
    description: 'Role of the user (hocVien, giaoVien, or quanTriVien)',
  })
  @IsEnum(users_role)
  role: users_role;

  @ApiProperty({ example: '123456789', description: 'Phone number of the user' })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ example: 'path/to/image.jpg', description: 'Picture path of the user', required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}
