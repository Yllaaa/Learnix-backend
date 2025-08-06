import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinUsFormDto {
  @IsEmail()
  email: string;
}

export class WaitListFormDto {
  @IsEmail()
  email: string;
}

export class VisitorMessageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
