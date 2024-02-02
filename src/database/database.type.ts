import { Books } from "src/books/models/book.model"
import { Student } from "src/student/models/student.model"


export type databaseModels  = {
    Student: typeof Student,
    Books: typeof Books
}