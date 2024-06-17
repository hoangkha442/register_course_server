import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { bodySignup } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
// Body, Controller, HttpCode, HttpException, HttpStatus, Post: Các lớp và hàm từ NestJS để xử lý yêu cầu HTTP, quản lý code trạng thái và xử lý ngoại lệ.
// AuthService: Dịch vụ xác thực được sử dụng để xử lý logic xác thực.
// bodyLogin, bodySignup: Các DTO (Data Transfer Object) dùng để truyền dữ liệu khi đăng nhập và đăng ký.
// ApiTags: Gắn nhãn cho các endpoint trong Swagger.


// Khai báo và định nghĩa controller
@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200) 
  // ApiTags("Auth"): Gắn nhãn "Auth" cho các endpoint trong Swagger.
  // Controller('auth'): Định nghĩa base route cho controller là auth.
  // AuthController: Khởi tạo controller với AuthService.
  // HttpCode(200): Thiết lập mã trạng thái HTTP mặc định là 200 cho các endpoint.

  // Đăng nhập
  @Post('login')
  login(@Body() bodyLogin: bodyLogin ){
    try{
      return this.authService.login(bodyLogin)
    }
    catch(exception){
      if(exception.status != 500){
        throw new HttpException(exception.response, exception.status)
      }
      throw new HttpException('Lỗi...', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  } 
// Post('login'): Định nghĩa endpoint POST để xử lý yêu cầu đăng nhập.
// login(@Body() bodyLogin: bodyLogin): Hàm xử lý đăng nhập, nhận dữ liệu từ DTO bodyLogin.
// try...catch: Xử lý ngoại lệ, nếu ngoại lệ không phải 500 thì ném ngoại lệ với mã trạng thái tương ứng, ngược lại ném ngoại lệ với mã trạng thái 500.


// Đăng ký
  @Post('signup')
  signup(@Body() bodySignup: bodySignup){
    return this.authService.signup(bodySignup)
  }
}
// Post('signup'): Định nghĩa endpoint POST để xử lý yêu cầu đăng ký.
// signup(@Body() bodySignup: bodySignup): Hàm xử lý đăng ký, nhận dữ liệu từ DTO bodySignup.
