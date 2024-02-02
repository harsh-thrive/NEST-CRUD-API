import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './books/book.module';
import { BookSubscription } from './bookSubscription/bookSubscription.module';
import { OpensearchModule } from './open-search/core/open-search.module';
import { QueueWorkerModule } from './queueWorker/core/queue-worker.module';


@Module({
  imports: [
    DatabaseModule,
    StudentModule,
    BookModule,
    BookSubscription,
    OpensearchModule,
    QueueWorkerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
