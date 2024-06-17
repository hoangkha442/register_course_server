import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

import { CloudinaryProvider } from './cloudinary.provider';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { CourseRegistrationModule } from './course-registration/course-registration.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PaymentModule } from './payment/payment.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  }), SubjectModule, ClassModule, CourseRegistrationModule, AttendanceModule, PaymentModule, CartModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, CloudinaryProvider],
})
export class AppModule {}
