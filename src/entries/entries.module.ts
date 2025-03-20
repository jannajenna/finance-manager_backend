import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, Category]), CategoriesModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
