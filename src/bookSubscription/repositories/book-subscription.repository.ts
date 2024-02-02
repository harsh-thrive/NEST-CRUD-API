import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { BookSubscriptionType } from "../type/book-subscription.type";
import { BookSubscriptionSchema } from "../book-subscription.schema";
import { BookSubscription } from "../models/book-subscription.model";

@Injectable()
export class BookSubscriptionRepository {
    private models: any;
    constructor(@Inject('SEQUELIZE') private database: DatabaseService){
        this.models = this.database.getModels()
    }

    async create(bookSubscriptionType: BookSubscriptionType):Promise<BookSubscription> {
        try{
            const newBookSubscription = await this.models.BookSubscription.create(bookSubscriptionType);
            return newBookSubscription;
        }catch(error){
            throw new Error(`Error while create new subscription for book${bookSubscriptionType.bookId} caused by: ${error}`)
        }
    }

    async delete(id: number): Promise<Boolean> {
        try{
            await this.models.BookSubscription.destroy(id);
            return true
        }catch(error){
            throw new Error(`Error while deleting subscription for book${id} caused by: ${error}`)
        }
    }
}