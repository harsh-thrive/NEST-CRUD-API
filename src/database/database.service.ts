import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "./dbconfig"
import { Student } from "src/student/models/student.model"
import { Books } from "src/books/models/book.model"
import { BookSubscription } from "src/bookSubscription/models/book-subscription.model";  
import { Session } from "src/auth/models/session.model";

@Injectable()
export class DatabaseService {
    private instance: Sequelize;
    constructor(){}

    async getSequelizeInstance() {
        this.instance = new Sequelize(dbConfig)
        this.instance.addModels([Student, Books, BookSubscription, Session])
        await this.instance.sync({})
    }

    getModels(){
        return this.instance.models;
    }
}