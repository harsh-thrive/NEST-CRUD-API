import {
    IsString,
    IsEmail,
    MinLength,
    IsNotEmpty,
    MaxLength
} from 'class-validator';

export class CreateStudentDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}