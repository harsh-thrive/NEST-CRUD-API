
export class StudentDto {

    id: number;

    name: string;

    email: string;

    constructor(student: StudentDto){
        this.id = student.id;
        this.name = student.name;
        this.email = student.email
    }
}