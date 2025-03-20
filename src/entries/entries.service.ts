import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    // Optionally, you can inject the Category repository if needed:
    // @InjectRepository(Category)
    // private categoryRepository: Repository<Category>,
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    if (!createEntryDto.categoryId) {
      throw new NotFoundException('Category ID is required');
    }
    // Create a new entry instance
    const entry = this.entryRepository.create({
      title: createEntryDto.title,
      amount: createEntryDto.amount,
      // To relate the entry to a category, set a partial category object with just the id
      category: { id: createEntryDto.categoryId } as Category,
    });
    return this.entryRepository.save(entry);
  }

  findAll(): Promise<Entry[]> {
    return this.entryRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Entry> {
    const entry = await this.entryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!entry) {
      throw new NotFoundException(`Entry with id ${id} not found`);
    }
    return entry;
  }

  async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    await this.entryRepository.update(id, {
      ...updateEntryDto,
      // If category is being updated, assign the new category via its id:
      ...(updateEntryDto.categoryId && {
        category: { id: updateEntryDto.categoryId },
      }),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.entryRepository.delete(id);
  }
}
