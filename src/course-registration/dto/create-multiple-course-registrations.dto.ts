import { CreateCourseRegistrationDto } from './create-course-registration.dto';
import { IsArray } from 'class-validator';

export class CreateMultipleCourseRegistrationsDto {
  @IsArray()
  registrations: CreateCourseRegistrationDto[];
}
