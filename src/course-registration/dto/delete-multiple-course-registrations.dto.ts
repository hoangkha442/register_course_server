// dto/delete-multiple-course-registrations.dto.ts
import { IsArray, IsInt } from 'class-validator';

export class DeleteMultipleCourseRegistrationsDto {
  @IsArray()
  @IsInt({ each: true })
  registrationIds: number[];
}
