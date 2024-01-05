import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { studentModule } from './student/student.module';

@Module({
  imports: [studentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
