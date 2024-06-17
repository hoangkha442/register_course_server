import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users } from '@prisma/client';
import { bodyLogin } from './dto/login.dto';
import { bodySignup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    prisma = new PrismaClient()
    constructor(
        private jwtService: JwtService,
    ){}

    async login(bodyLogin: bodyLogin) { 
        const getUser = await this.prisma.users.findUnique({ // tìm 1 user trong database
          where: { email: bodyLogin.email } // mà email của user đó trùng với email của người dùng nhập vào
        });
        if (!getUser) { // nếu email người dùng nhập vào không trùng với 1 trong những email có trong database
          throw new HttpException('Sai Email!', HttpStatus.BAD_REQUEST); // thì báo sai email
        }
        const isPasswordMatching = await bcrypt.compare(bodyLogin.password, getUser.password);  // 123 => ạhdhqweqwkeqwjelqwjk
        if (!isPasswordMatching) {
          throw new HttpException("Sai mật khẩu!", HttpStatus.BAD_REQUEST);
        }
        try {
          const token = await this.jwtService.signAsync(
            { data: { userID: getUser.user_id } }, 
            { expiresIn: "10d", secret: "KHONG_CO_KHOA" }
          );
          return { token: token, 'role': getUser.role };
        } catch (error) {
          throw new HttpException('Lỗi khi tạo token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    async signup(@Body() bodySignup: bodySignup) {
        const checkEmail = await this.prisma.users.findUnique({
            where: { email: bodySignup.email}
        })
        if(!checkEmail){
            let newPassword =  await bcrypt.hash(bodySignup.password, 10);
            const newUser = await this.prisma.users.create({
                data: { ...bodySignup, role: "hocVien",
                    password: newPassword
                }
            })
            return newUser
        }
        throw new HttpException('Email đã tồn tại!', HttpStatus.BAD_REQUEST)
    }
}
