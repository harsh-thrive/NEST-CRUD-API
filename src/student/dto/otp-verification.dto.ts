import { IsNotEmpty } from "class-validator";

export class VerifyOTPDto {

    @IsNotEmpty()
    studentId: number;

    @IsNotEmpty()
    otp: string;
}