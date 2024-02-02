import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [],
  providers: [...DatabaseProvider, DatabaseService],
  exports: [...DatabaseProvider, DatabaseService]
})
export class DatabaseModule {}
