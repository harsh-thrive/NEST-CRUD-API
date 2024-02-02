import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports:[DatabaseModule],
    providers:[AuthService,AuthRepository],
    controllers:[],
    exports:[AuthService]
})
export class AuthModule{}