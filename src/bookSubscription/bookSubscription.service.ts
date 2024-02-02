import { Inject, Injectable } from "@nestjs/common";
import { BookSubscriptionRepository } from "./repositories/book-subscription.repository";
import { BookSubscriptionType } from "./type/book-subscription.type";
import { BookSubscriptionSchema } from "./book-subscription.schema";
import { OpenSearchService } from "src/open-search/core/open-search.service";
import { OPEN_SEARCH_QUEUE_JOB, SUBSSCRIPTION_INDEX_NAME } from "./constants/search.constants";
import { BooksService } from "src/books/book.service";
import { QueueService } from "src/queue/core/queue.service";


@Injectable()
export class BookSubscriptionService {
    constructor(@Inject('QUEUE')private queueService: QueueService, 
    @Inject('OPEN_SEARCH') private openSearchService: OpenSearchService,  
    private bookSubscriptionRepository: BookSubscriptionRepository, private bookService: BooksService){}

    async create(bookSubscriptionType: BookSubscriptionType): Promise<BookSubscriptionSchema>{

        const currentDate = new Date();
        const dueDate: Date = this.calcSubscriptiondueDate(currentDate);
        bookSubscriptionType.dueDate = dueDate
        const newSubscription = await this.bookSubscriptionRepository.create(bookSubscriptionType);
        const book = await this.bookService.getBook(newSubscription.bookId)
        const body = {
            indexName: SUBSSCRIPTION_INDEX_NAME,
            data: {
                studentId: newSubscription.studentId,
                subscription: {
                    bookId: book.id,
                    authorId: book.authorId,
                    title: book.name,
                    susbscriptionId: newSubscription.susbsciptionId,
                    dueDate: newSubscription.dueDate
                }
            }
        }
        const job = await this.queueService.addJob(OPEN_SEARCH_QUEUE_JOB, body)
        const bookSubscriptionSchema = {
            subscriptionId: newSubscription.susbsciptionId,
            bookId: newSubscription.bookId,
            studentId: newSubscription.studentId,
            dueDate: newSubscription.dueDate
        };
        return bookSubscriptionSchema; 
    }

    async getSubscriptions(id: number): Promise<Record<string, any>>{
        const query = {
            query: {
                term: {
                  studentId: {
                    value: id
                  }
                }
            }
        }
        const response = await this.openSearchService.searchIndex(SUBSSCRIPTION_INDEX_NAME, query)
        return response.body
    }

    async delete(id: number): Promise<Boolean>{
        await this.bookSubscriptionRepository.delete(id);
        return true
    }

    calcSubscriptiondueDate(currentDate: Date): Date {
        try{
            const next30Days = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            return next30Days;
        }catch(error){
            throw new Error(`Error while calclating date`)
        }
        
    }

    async InjestToOpenSearch(indexName: string, data: any){
        try{
            const response = await this.openSearchService.addDocument(indexName, data);
            return response;
        }catch(error){
            throw new Error(`Error while injecting to open search`)
        }
    }
}