import {
    IsString,
    MinLength,
    IsNotEmpty,
} from 'class-validator';

export class CreateBookDto {

    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    authorId: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    studentId?: number
        
}