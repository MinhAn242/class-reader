import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { CreateReadingDto, UpdateReadingDto } from '../common/dto/reading.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/entities/user.entity';

@Controller('readings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  // ✅ Mọi người đều có thể xem danh sách readings
  @Get()
  findAll() {
    return this.readingsService.findAll();
  }

  // ✅ Xem chi tiết 1 reading theo ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readingsService.findOne(id);
  }

  // ✅ Chỉ ADMIN mới có quyền thêm reading
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateReadingDto, @Request() req) {
    const user = req.user; // user được lấy từ JWT payload
    return this.readingsService.create(dto, user);
  }

  // ✅ Chỉ ADMIN mới có quyền cập nhật
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReadingDto) {
    return this.readingsService.update(id, dto);
  }

  // ✅ Chỉ ADMIN mới có quyền xóa
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.readingsService.remove(id);
  }
}
