// src/favorites/favorites.controller.ts
import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // GET /favorites?userId=u1
  @Get()
  async findAll(@Query('userId') userId: string) {
    return this.favoritesService.findAll(userId);
  }

  // POST /favorites/1?userId=u1
  @Post(':bookId')
  async add(@Param('bookId') bookId: string, @Query('userId') userId: string) {
    return this.favoritesService.add(userId, bookId);
  }

  // DELETE /favorites/1?userId=u1
  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string, @Query('userId') userId: string) {
    return this.favoritesService.remove(userId, bookId);
  }
}
