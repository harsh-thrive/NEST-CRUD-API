import { Inject, Injectable } from "@nestjs/common";
import { Student } from "../models/student.model";
import { DatabaseService } from "src/database/database.service";
import { Logger } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { CreateStudentType, UpdateStudentType } from "../types/student.types";

@Injectable()
export class StudentRepository {
    private logger = new Logger(StudentRepository.name)
    private models: any;

    constructor(@Inject('SEQUELIZE') private database: DatabaseService){
        this.models = this.database.getModels()
    }

    async findAll(): Promise<Student[]>{
        try{
            const studentList: Student[] = await this.models.Student.findAll()
            return studentList;
        }catch(error){
            throw new Error(`Error while fetching the students: ${error}`)
        }
        
    }

    async findOne(id: number): Promise<Student | null> {
        try{
            const student: Student = await this.models.Student.findByPk(id);
            return student;
        }catch(error){
            throw new Error(`Error while fetching the student with id:${id} error: ${error}`)
        }
        
    }

    async findByEmail(email: string): Promise<Student | null>{
        try{
            const student: Student = await this.models.Student.findOne({
                where: {
                    email: email
                }
            })
            return student;
        }catch(error){
            throw new Error(`Error while fetching the student with email:${email} error: ${error}`)
        }
    }

    async create(createStudent: CreateStudentType): Promise<Student>{
        try{
            const student: Student = await this.models.Student.create(createStudent);
            return student
        }catch(error){
            throw new Error(`Error while creating student: ${error}`)
        }
    }

    async updateStudent(id: number, updateStudent: UpdateStudentType): Promise<Student>{
        try{
            const [count, [updatedStudent]] = await this.models.Student.update({name: updateStudent.name},{
                where: {
                    id: id
                },
                returning: true
            });
            return updatedStudent;
        }catch(error){
            throw new Error(`Error while updating student: ${updateStudent.name} caused by:${error}`)
        }
    }

    async deleteStudent(id: number): Promise<Boolean>{
        try{
            await this.models.Student.destroy({
                where: {
                    id: id
                }
            })
            return true;
        }catch(error){
            throw new Error(`Error while deleting student with id: ${id} caused by:${error}`)
        }
    }
 
}