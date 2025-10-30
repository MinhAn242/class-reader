// src/library/library.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  // GET /library?grade=1&level=easy
  @Get()
  async findAll(
    @Query('grade') grade?: string,
    @Query('level') level?: string,
  ) {
    return this.libraryService.findAll({ grade, level });
  }

  // GET /library/1
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.libraryService.findOne(id);
  }
}
