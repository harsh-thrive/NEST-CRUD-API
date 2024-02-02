import {
    MinLength,
    IsNotEmpty,
    MaxLength,
    IsEmail
} from 'class-validator';
import { Student } from '../models/student.model';
import { StudentSchema } from '../schemas/student.schema';


export class StudentSignUpResponseDto {

    name: string;

    email: string;

    constructor(student: StudentSchema){
        this.name = student.name;
        this.email = student.email;
    }
}