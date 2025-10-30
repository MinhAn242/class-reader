// src/favorites/favorites.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private favorites: Record<string, string[]> = {
    // ví dụ userId "u1" đã thích 1 bài
    u1: ['1'],
  };

  // Lấy danh sách yêu thích của user
  findAll(userId: string) {
    return this.favorites[userId] || [];
  }

  // Thêm bài vào yêu thích
  add(userId: string, bookId: string) {
    if (!this.favorites[userId]) {
      this.favorites[userId] = [];
    }
    if (!this.favorites[userId].includes(bookId)) {
      this.favorites[userId].push(bookId);
    }
    return this.favorites[userId];
  }

  // Xóa bài khỏi yêu thích
  remove(userId: string, bookId: string) {
    if (!this.favorites[userId]) return [];
    this.favorites[userId] = this.favorites[userId].filter((id) => id !== bookId);
    return this.favorites[userId];
  }
}
