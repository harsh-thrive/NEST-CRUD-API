import { Module } from "@nestjs/common";
import { BooksService } from "./book.service";
import { BooksRepository } from "./repositories/books.repository";
import { BooksController } from "./book.controller";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports: [DatabaseModule],
    providers: [BooksService, BooksRepository],
    controllers: [BooksController],
    exports: [BooksService]
})
export class BookModule {}