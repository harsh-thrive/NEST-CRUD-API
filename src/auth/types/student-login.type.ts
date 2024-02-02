import { StudentLoginDto } from "../dto/student-login.dto";

export class StudentLoginType {
    email: string;
    password: string;

    constructor(studentLoginDto: StudentLoginDto){
        this.email = studentLoginDto.email;
        this.password = studentLoginDto.password
    }
}