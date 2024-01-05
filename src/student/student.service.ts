import { Injectable } from "@nestjs/common";
import { Student } from "./student";

@Injectable()
export class StudentService {
    
    private studentArr: Student[] = [];
    
    getAllStudents(): Student[] {
        return this.studentArr;
    }

    getStudent(id: number): Student {
        let stud: Student = this.studentArr.find((item)=>item.id === id);
        return stud;
    }

    createStudent(student: Student): Student{
        if(this.getStudent(student.id)){
            return null;
        }
        this.studentArr.push(student);
        return student;
    }

    updateStudent(student: Student) {
        this.studentArr.forEach((item, ind, arr)=>{
            if(item.id === student.id){
                arr[ind] = student
            }
        }) 
    } 

    deleteStudent(id: number){
        let ind = this.studentArr.findIndex(item=>item.id===id)
        ind != -1 && this.studentArr.splice(ind,1); 
        return
    }
}