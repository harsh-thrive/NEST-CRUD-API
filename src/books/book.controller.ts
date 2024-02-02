import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Books } from "./models/book.model";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookDto } from "./dto/book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BooksService } from "./book.service";
import { BookSchema } from "./schemas/book.schema";

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}

    @Get()
    async getBooks(): Promise<Books[]>{
        const books: Books[] = await this.bookService.getAllBooks();
        return books;
    }

    @Get(':id')
    async getBook(@Param('id', ParseIntPipe)id: number): Promise<Books> {
        const book = await this.bookService.getBook(id);
        return book;
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<BookSchema>{
        console.log('Books:',createBookDto)
        const book = await this.bookService.create(createBookDto);
        return book
    }

    @Put(':id')
    async updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto){
        const updatedBook: Books = await this.bookService.update(id, book);
        return new BookDto(updatedBook);
    }

    @Delete(':id')
    async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<Boolean>{
        try{
            await this.bookService.delete(id);
            return true
        }catch(error){
            throw new Error('Error while deleting book');
        } 
    }
}