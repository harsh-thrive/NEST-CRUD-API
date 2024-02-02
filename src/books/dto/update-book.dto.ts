import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class UpdateBookDto {
    
    @IsNotEmpty()
    @IsString()
    content: string;
}