import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, Res, Req } from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentDto } from "./dto/student.dto";
import { StudentLoginDto } from "../auth/dto/student-login.dto";
import { CreateStudentType, UpdateStudentType } from "./types/student.types";
import { StudentSchema } from "./schemas/student.schema";
import { VerifyOTPDto } from "./dto/otp-verification.dto";


@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Get()
    async getAllStudents() : Promise<StudentSchema[]>{
        try{
            const studentsSchema: StudentSchema[] = await this.studentService.getAllStudents();
            return studentsSchema;
        }catch(error){
            throw new Error(`Error while fetching students caused by: ${error}`)
        }
    }

    @Get(':id')
    async getStudent(@Param('id', ParseIntPipe) id: number) : Promise<StudentDto> {
        try{
            const student = await this.studentService.getStudent(id);
            return student;
        }catch(error){
            throw new Error(`Error while fetching student caused by: ${error}`)
        }
    }

    @Post('register')
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<StudentSchema>{
        const createStudent: CreateStudentType = new CreateStudentType(createStudentDto)
        try{
            const student = await this.studentService.createStudent(createStudent);
            return (student)
        }catch(error){
            throw new Error(`Error while creating student caused by: ${error}`)
        }
    }

    @Post('login')
    async loginStudent(@Body() studentLoginDto: StudentLoginDto): Promise<StudentSchema>{
        try{
            const studentSchema = await this.studentService.studentLogin(studentLoginDto)
            return studentSchema;
        }catch(error){
            throw new Error(`Error while logging in student caused by: ${error}`)
        }
        
    }

    @Post('logout/:id')
    async logoutStudent(@Param('id', ParseIntPipe) studentId: number): Promise<Boolean>{
        try{
            await this.studentService.studentLogout(studentId)
            return true;
        }catch(error){
            throw new Error(`Error while logging out studentcaused by: ${error}`)
        }
        
    }

    @Post('login/otp')
    async verifyOtp(@Body() verifyOTPDto: VerifyOTPDto ): Promise<Boolean>{
        try{
            await this.studentService.verifyOTP(verifyOTPDto)
            return true;
        }catch(error){
            throw new Error(`Error while otp verification out student caused by: ${error}`)
        }
        
    }

    @Put(':id')
    async updateStudent(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto): Promise<StudentDto>{
        const updateStudent: UpdateStudentType = new UpdateStudentType(updateStudentDto)
        try{
            const updatedStudent: StudentSchema = await this.studentService.updateStudent(id, updateStudent);
            return new StudentDto(updatedStudent);
        }catch(error){
            throw new Error(`Error while creating student caused by: ${error}`)
        }
    }

    @Delete(':id')
    async deleteStudent(@Param('id', ParseIntPipe) id: number): Promise<Boolean>{
        try{
            const result = await this.studentService.deleteStudent(id);
            return result
        }catch(error){
            throw new Error(`Error while delting student caused by: ${error}`)
        }
        
    }
}