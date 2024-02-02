import { CreateStudentDto } from "../dto/create-student.dto";
import { StudentLoginDto } from "../../auth/dto/student-login.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";

export class CreateStudentType {
    name: string;
    email: string;
    password: string;

    constructor(createStudentDto: CreateStudentDto){
        this.name = createStudentDto.name;
        this.email = createStudentDto.email;
        this.password = createStudentDto.password
    }
}

export class StudentLoginType {
    email: string;
    password: string;

    constructor(studentLoginDto: StudentLoginDto){
        this.email = studentLoginDto.email;
        this.password = studentLoginDto.password
    }
}

export class UpdateStudentType {
    name: string;
    constructor(updateStudentDto: UpdateStudentDto){
        this.name = updateStudentDto.name;
    }
}

export class StudentAuthType {
    studentId: number;
    sessionId: string;

    constructor(){}
}