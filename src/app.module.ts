import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from 'data.source';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    CategoriesModule,
    EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
