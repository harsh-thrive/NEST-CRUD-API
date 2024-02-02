import { BookSubscription } from "../models/book-subscription.model"

export class SubscriptionDto {

    bookId: number

    dueDate: string

    constructor(bookSubscription: BookSubscription){
        this.bookId = bookSubscription.bookId;
        this.dueDate = bookSubscription.dueDate;
    }

}