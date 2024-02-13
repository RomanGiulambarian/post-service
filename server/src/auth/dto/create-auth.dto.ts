import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  password: string;
}
