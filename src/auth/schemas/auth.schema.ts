import { sessionStatus } from "../enums/session.enum";
import { Session } from "../models/session.model";

export class AuthSchema{
    sessionId: string;
    studentId: number;
    status: sessionStatus;

    constructor(session: Session){
        this.sessionId = session.sessionId;
        this.studentId = session.studentId
        this.status = session.status
    }
}