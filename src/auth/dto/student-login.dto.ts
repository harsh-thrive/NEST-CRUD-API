import {
    IsNotEmpty,
    IsEmail,
    IsString,
    MinLength
} from 'class-validator';


export class StudentLoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    password: string;
}