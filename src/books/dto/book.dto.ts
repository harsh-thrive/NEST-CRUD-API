import { Books } from "../models/book.model";

export class BookDto {

    name: string;

    authorId: number;

    content: string;

    constructor(book: Books){
        this.name = book.name;
        this.authorId = book.authorId;
        this.content = book.content;
    }
}