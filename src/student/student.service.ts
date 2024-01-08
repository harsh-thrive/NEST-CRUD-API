import { Injectable } from "@nestjs/common";
import { Student } from "./student";

@Injectable()
export class StudentService {
    
    private studentArr: Student[] = [];
    
    getAllStudents(): Student[] {
        let students: Student[] = this.studentArr;
        return students
    }

    getStudent(id: number): Student {
        try{
            let stud: Student = this.studentArr.find((item)=>item.id === id);
            return stud;
        }
        catch(error){
            console.log("Error in fetching student:",error)
        }
    }

    createStudent(student: Student): Student{
        try{
            !this.getStudent(student.id) && this.studentArr.push(student)
            let newStudent: Student = this.getStudent(student.id) ? null : student
            return newStudent;
        }
        catch(error){
            console.log("Error in creating new Srudent:",error)
        }
        
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