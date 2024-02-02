import { Student } from "../models/student.model";

export class StudentSchema {
    id: number;
    name: string;
    email: string;
    sessionId?: string
    otp?: string

    constructor(student: Student){
        this.id = student.id;
        this.name = student.name;
        this.email = student.email
    }
}