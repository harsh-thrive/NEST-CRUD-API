import { Injectable } from "@nestjs/common";
import { AuthSchema } from "./schemas/auth.schema";
import { AuthRepository } from "./auth.repository";
import { StudentAuthType } from "src/student/types/student.types";
import { Session } from "./models/session.model";

@Injectable()
export class AuthService{
    
    constructor(private authRepository: AuthRepository){}

    async createSession(studentAuthType: StudentAuthType): Promise<AuthSchema>{
        try{
            const session = await this.authRepository.createSession(studentAuthType)
            const sessionSchema = new AuthSchema(session);
            return sessionSchema;
        }catch(error){
            throw new Error(`Error while creating session`)
        }
    }

    async updateSessions(studentId: number): Promise<Boolean>{
        try{
            await this.authRepository.updateSessions(studentId)
            return true;
        }catch(error){
            throw new Error(`Error while deleting session`)
        }
    }

    async deleteSession(id: string): Promise<Boolean>{
        try{
            await this.authRepository.deleteSession(id)
            return true;
        }catch(error){
            throw new Error(`Error while deleting session`)
        }
    }

    async getStudentSessions(id: number): Promise<AuthSchema[]>{
        try{
            const sessionList = await this.authRepository.studentSessions(id);
            const sessionSchemaList: AuthSchema[] = sessionList.map((item)=>{
                return new AuthSchema(item)
            })
            return sessionSchemaList;
        }catch(error){
            throw new Error(`Error while fetching student sessions`)
        }
    }

    async getSession(id: number): Promise<AuthSchema>{
        try{
            const session = await this.authRepository.getSession(id)
            return session;
        }catch(error){
            throw new Error(`Error while fetching session for: ${id} causedBy: ${error}`)
        }
    }
    

}