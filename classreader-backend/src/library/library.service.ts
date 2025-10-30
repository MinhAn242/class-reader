// src/library/library.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LibraryService {
  private books = [
    {
      id: '1',
      title: 'Bé tập đọc',
      grade: 1,
      level: 'easy',
      summary: 'Bài đọc ngắn cho lớp 1',
      content: 'Ngày xửa ngày xưa... (toàn văn)',
    },
    {
      id: '2',
      title: 'Truyện cổ tích',
      grade: 2,
      level: 'medium',
      summary: 'Tóm tắt truyện cổ tích nổi tiếng',
      content: 'Ngày xửa ngày xưa có một nàng công chúa... (toàn văn)',
    },
  ];

  findAll(filter: { grade?: string; level?: string }) {
    return this.books.filter(
      (b) =>
        (!filter.grade || b.grade.toString() === filter.grade) &&
        (!filter.level || b.level === filter.level),
    );
  }

  findOne(id: string) {
    return this.books.find((b) => b.id === id);
  }
}
