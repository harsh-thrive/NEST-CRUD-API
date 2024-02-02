import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repositories/student.repository";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "src/auth/auth.module";
import { MyRedisModule } from "src/redis/redis.module";

@Module({
    imports:[DatabaseModule, AuthModule, MyRedisModule],
    controllers : [StudentController],
    providers : [StudentService, StudentRepository],
    exports: []
})
export class StudentModule {}