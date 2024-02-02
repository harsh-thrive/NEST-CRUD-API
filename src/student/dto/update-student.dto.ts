import {
    MinLength,
    IsNotEmpty,
    MaxLength
} from 'class-validator';

export class UpdateStudentDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(40)
    name: string;

}