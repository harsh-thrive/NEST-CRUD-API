import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { BookSubscriptionController } from "./bookSubscription.controller";
import { BookSubscriptionService } from "./bookSubscription.service";
import { BookSubscriptionRepository } from "./repositories/book-subscription.repository";
import { OpensearchModule } from "src/open-search/core/open-search.module";
import { BookModule } from "src/books/book.module";
import { QueueModule } from "src/queue/core/queue.module";

@Module({
    imports:[DatabaseModule, OpensearchModule, BookModule, QueueModule],
    providers:[BookSubscriptionService, BookSubscriptionRepository],
    controllers:[BookSubscriptionController],
    exports:[BookSubscriptionService]
})
export class BookSubscription {}