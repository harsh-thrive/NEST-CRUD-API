import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./repositories/books.repository";
import { Books } from "./models/book.model";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookDto } from "./dto/book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookSchema } from "./schemas/book.schema";

@Injectable()
export class BooksService {

    constructor(private booksRepository: BooksRepository){}

    async getAllBooks(): Promise<Books[]> {
        const books = await this.booksRepository.findAll()
        return books;
    }

    async getBook(id: number): Promise<Books> {
        const book = this.booksRepository.findOne(id);
        return book; 
    }

    async create(createBookDto: CreateBookDto): Promise<BookSchema>{
        console.log('Books:',createBookDto)
        const newBook = await this.booksRepository.create(createBookDto);
        const bookSchema: BookSchema = {
            id: newBook.id,
            name: newBook.name,
            authorId: newBook.authorId
        }
        return bookSchema;
    }

    async update(id: number, book: UpdateBookDto): Promise<Books> {
        const updatedBook = await this.booksRepository.update(id, book);
        return updatedBook;
    } 

    async delete(id: number){
        return await this.booksRepository.delete(id)
    }

}