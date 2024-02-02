import { Inject, Injectable } from "@nestjs/common";
import { StudentLoginType } from "./types/student-login.type";
import { Session } from "./models/session.model";
import { DatabaseService } from "src/database/database.service";
import { StudentService } from "src/student/student.service";
import { StudentAuthType } from "src/student/types/student.types";
import { sessionStatus } from "./enums/session.enum";


@Injectable()
export class AuthRepository{
    private models: any;

    constructor(@Inject('SEQUELIZE')private database: DatabaseService){
        this.models = database.getModels()
    }

    async createSession(studentAuthType: StudentAuthType): Promise<Session>{
        try{
            const session = await this.models.Session.create(studentAuthType);
            return session;
        }catch(error){
            throw new Error(`Error while creating session for student: ${studentAuthType.studentId} causedBy: ${error}`)
        }
    }

    async deleteSession(id: string): Promise<Boolean>{
        try{
            await this.models.Session.update({status: sessionStatus.INACTIVE },{
                where: {
                    sessionId: id
                }
            })
            return true;
        }catch(error){
            throw new Error(`Error while deleting session for student: ${id} causedBy: ${error}`)
        }
    }

    async updateSessions(studentId: number): Promise<Boolean>{
        try{
            await this.models.Session.update({status: sessionStatus.INACTIVE },{
                where: {
                    studentId: studentId,
                    status: sessionStatus.ACTIVE
                }
            })
            return true;
        }catch(error){
            throw new Error(`Error while updating existing session for student: ${studentId} causedBy: ${error}`)
        }
    }

    async studentSessions(studentId: number): Promise<Session[]>{
        try{
            const sessionsList = await this.models.Session.findAll({
                where:{
                    studentId : studentId
                }
            })
            return sessionsList;
        }catch(error){
            throw new Error(`Error while fetching session for student: ${studentId} causedBy: ${error}`)
        }
    }

    async getSession(id: number): Promise<Session>{
        try{
            const session = await this.models.Session.findByPK({
                where:{
                    sessionId : id
                }
            })
            return session;
        }catch(error){
            throw new Error(`Error while fetching session for: ${id} causedBy: ${error}`)
        }
    }
}