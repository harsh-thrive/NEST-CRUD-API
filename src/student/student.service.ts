import { BadRequestException, Inject, Injectable, Logger, Req, Res } from "@nestjs/common";
import { Student } from "./models/student.model";
import { StudentRepository } from "./repositories/student.repository";
import { CreateStudentType, StudentAuthType, UpdateStudentType } from "./types/student.types";
import { StudentSchema } from "./schemas/student.schema";
import { AuthSchema } from "src/auth/schemas/auth.schema";
import { StudentLoginDto } from "src/auth/dto/student-login.dto";
import { uuid } from 'uuidv4';
import { AuthService } from "src/auth/auth.service";
import { VerifyOTPDto } from "./dto/otp-verification.dto";
import { RedisService } from "src/redis/redis.service";
import { LOGIN_BLOCK_TIME, MAX_ATTEMPTS, OTP_TTL, WRONG_PASSWORD_COUNT, WRONG_PASSWORD_COUNT_TTL } from "./constants/redis.constants";


@Injectable()
export class StudentService {
    private logger = new Logger(StudentService.name)

    constructor(private studentRepository: StudentRepository, private authService: AuthService, @Inject('REDIS') private redisService: RedisService) { }

    async getAllStudents(): Promise<StudentSchema[]> {
        try {
            const students = await this.studentRepository.findAll()
            return students;
        } catch (error) {
            throw new Error(`Error while fetching students`)
        }

    }

    async getStudent(id: number): Promise<StudentSchema> {
        try {
            const student = await this.studentRepository.findOne(id);
            const studentSchema = new StudentSchema(student)
            console.log("converted student:", studentSchema)
            return studentSchema;
        } catch (error) {
            throw new Error(`Error while fetching student`)
        }
    }

    async studentLogin(studentLoginDto: StudentLoginDto): Promise<StudentSchema> {
        try {
            const student = await this.studentRepository.findByEmail(studentLoginDto.email)
            const studentSchema = new StudentSchema(student)
            const isBlocked = await this.isLoginBlocked(student.id) 
            if (isBlocked) {
                console.log("Is login Blocked:",isBlocked)
                throw new BadRequestException('Too Many attempts')
            }
            const passwordMatched = studentLoginDto.password == student?.password ? true : false
            if (passwordMatched) {
                const otp = await this.setOtp(student.id);
                studentSchema.otp = otp
                return studentSchema;
            } else {
                await this.storeWrongPasswordCount(student.id)
                throw new BadRequestException('Password not matched')
            }
        } catch (error) {
            throw new Error(`Error while Logging in student caused by: ${error}`)
        }
    }

    async isLoginBlocked(studentId: number): Promise<Boolean>{
        try{
            const key = `${WRONG_PASSWORD_COUNT}:${studentId.toString()}`
            const count = await this.redisService.get(key)
            if(count && Number(count) >= MAX_ATTEMPTS){
                return true;
            }
            return false;
        }catch(error){
            throw new Error(`Error while checking is blocked from logging`)
        }
    }

    async storeWrongPasswordCount(studentId: number): Promise<Boolean>{
        try {
            const key = `${WRONG_PASSWORD_COUNT}:${studentId.toString()}`
            const count = await this.redisService.get(key);
            if (count == null) {
                await this.redisService.set(key, '1', WRONG_PASSWORD_COUNT_TTL)
            }else if (Number(count) < MAX_ATTEMPTS - 1) {
                await this.redisService.increment(key);
            } else if (Number(count) == MAX_ATTEMPTS - 1) {
                await this.redisService.increment(key);
                await this.redisService.expire(key, LOGIN_BLOCK_TIME)
            }
            return true
        } catch (error) {
            throw new Error(`Error while storing wrong password count: ${error}`)
        }
    }

    generateOTP(): string {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString();
    }

    async setOtp(studentId: number): Promise<string> {
        try {
            const otp = this.generateOTP()
            await this.redisService.set(studentId.toString(), otp, OTP_TTL)
            return otp
        } catch (error) {
            throw new Error(`Error while setting OTP`)
        }
    }

    async createSession(studentId: number): Promise<string | null> {
        try {
            const studentAuthType: StudentAuthType = {
                studentId: studentId,
                sessionId: uuid()
            }
            await this.authService.updateSessions(studentId)
            const authSchema = await this.authService.createSession(studentAuthType);
            return authSchema.sessionId
        } catch (error) {
            throw new Error(`Error while creating session`)
        }
    }

    async verifyOTP(verifyOTPDto: VerifyOTPDto): Promise<string | null> {
        try {
            const otp = await this.redisService.get(verifyOTPDto.studentId.toString());
            if (otp == verifyOTPDto.otp) {
                const sessionId = await this.createSession(verifyOTPDto.studentId);
                return sessionId
            }
        } catch (error) {
            throw new Error(`Error while otp vrification`)
        }
    }

    async studentLogout(studentId: number): Promise<Boolean> {
        try {
            await this.authService.updateSessions(studentId)
            return true;
        } catch (error) {
            throw new Error(`Error while logging out student`)
        }
    }

    async createStudent(student: CreateStudentType): Promise<StudentSchema> {
        try {
            const existedStudent = await this.studentRepository.findByEmail(student.email)
            const newStudent: Student = !existedStudent ? await this.studentRepository.create(student) : null
            const studentAuthType: StudentAuthType = {
                studentId: newStudent.id,
                sessionId: uuid()
            }
            const sessionSchema = await this.authService.createSession(studentAuthType)
            const studentSchema = new StudentSchema(newStudent)
            studentSchema.sessionId = sessionSchema.sessionId
            //console.log(studentSchema)
            return studentSchema;
        } catch (error) {
            throw new Error(`Error while creating student`)
        }

    }

    async updateStudent(id: number, student: UpdateStudentType): Promise<StudentSchema> {
        try {
            const updatedStudent = await this.studentRepository.updateStudent(id, student);
            const studentSchema = new StudentSchema(updatedStudent)
            return studentSchema;
        } catch (error) {
            throw new Error(`Error while updating student`)
        }
    }

    async deleteStudent(id: number): Promise<Boolean> {
        try {
            const result = await this.studentRepository.deleteStudent(id)
            return result;
        } catch (error) {
            throw new Error(`Error while deleting student`)
        }

    }

}