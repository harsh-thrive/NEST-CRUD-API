import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "./student";

@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Get()
    getAllStudents() : Student[] {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getStudent(@Param('id', ParseIntPipe) id: number) : Student {
        return this.studentService.getStudent(id);
    }

    @Post()
    createStudent(@Body() student: Student){
        return this.studentService.createStudent(student);
    }

    @Put()
    updateStudent(@Body() student: Student){
        return this.studentService.updateStudent(student);
    }

    @Delete(':id')
    deleteStudent(@Param('id', ParseIntPipe) id: number){
        return this.studentService.deleteStudent(id);
    }
}