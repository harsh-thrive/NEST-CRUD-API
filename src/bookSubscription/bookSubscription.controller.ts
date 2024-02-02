import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { BookSubscriptionService } from "./bookSubscription.service";
import { BookSubscriptionType } from "./type/book-subscription.type";
import { BookSubscriptionSchema } from "./book-subscription.schema";

@Controller('subscribe')
export class BookSubscriptionController {

    constructor(private bookSubscriptionService: BookSubscriptionService){}

    @Post()
    async create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<BookSubscriptionSchema> {
        const bookSubscription: BookSubscriptionType = {
            ...createSubscriptionDto
        }
        console.log("bookSubscription:",bookSubscription)
        const newSubscription = await this.bookSubscriptionService.create(bookSubscription)
        return newSubscription
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)id: number) {
        await this.bookSubscriptionService.delete(id)
        return 
    }

    @Get(':id')
    async getSubscriptions(@Param('id', ParseIntPipe)id: number){
        const response = await this.bookSubscriptionService.getSubscriptions(id);
        return response;
    }
}