import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class RegisterCourseDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsInt()
  cityId: number;

  @IsInt()
  trainerId: number;
}
