import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entryService: EntriesService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entryService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id);
  }
}
