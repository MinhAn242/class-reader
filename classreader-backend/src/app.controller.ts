import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { message: '🎉 Backend ClassReader đã chạy và kết nối MySQL thành công!' };
  }
}
