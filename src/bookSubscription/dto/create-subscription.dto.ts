import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubscriptionDto {

    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @IsNotEmpty()
    @IsNumber()
    studentId: number

}