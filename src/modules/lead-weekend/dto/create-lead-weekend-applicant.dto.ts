import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLeadWeekendApplicantDto {
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
  companyName: string;

  @IsInt()
  cityId: number;

  @IsInt()
  trainerId: number;
}
