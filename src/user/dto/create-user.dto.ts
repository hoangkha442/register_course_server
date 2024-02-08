// createUser.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email của người dùng' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mật khẩu của người dùng' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Họ và tên của người dùng' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    example: UserRole.Customer,
    description: 'Vai trò của người dùng (admin hoặc customer)',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: '123456789', description: 'Số điện thoại của người dùng' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '2022-01-20T12:00:00.000Z', description: 'Ngày đăng nhập gần nhất của người dùng' })
  @IsString()
  last_login_date: string;
}
