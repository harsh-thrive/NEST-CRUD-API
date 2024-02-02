import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Books } from "../models/book.model";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

@Injectable()
export class BooksRepository {
    private models: any;

    constructor(@Inject('SEQUELIZE')private database: DatabaseService){
        this.models = this.database.getModels();
    }

    async findAll(): Promise<Books[]>{
        try{
            const books: Books[] = await this.models.Books.findAll();
            return books
        }catch(error){
            throw new Error(`Error while fetching the books: ${error}`)
        }   
    }

    async findOne(id: number): Promise<Books> {
        try{
            const book: Books = await this.models.Books.findByPk(id);
            return book;
        }catch(error){
            throw new Error(`Error while fetching the book with id:${id} error: ${error}`)
        }
        
    }

    async create(createBook: CreateBookDto): Promise<Books>{
        try{
            const book: Books = await this.models.Books.create(createBook);
            return book;
        }catch(error){
            throw new Error(`Error while creating book: ${error}`)
        }
    }

    async update(id: number, book: UpdateBookDto): Promise<Books>{
        try{
            const updatedBook: Books = await this.models.Books.update({content: book.content},{
                where: {
                    id: id
                }
            });
            return updatedBook;
        }catch(error){
            throw new Error(`Error while updating book: ${id} caused by:${error}`)
        }
    }

    async delete(id: number){
        try{
            await this.models.Books.destroy({
                where: {
                    id: id
                }
            })
        }catch(error){
            throw new Error(`Error while deleting book with id: ${id} caused by:${error}`)
        }
    }

}