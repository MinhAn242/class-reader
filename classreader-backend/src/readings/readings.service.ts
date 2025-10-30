import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from '../common/entities/reading.entity';
import { CreateReadingDto, UpdateReadingDto } from '../common/dto/reading.dto';
import { User } from '../common/entities/user.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepo: Repository<Reading>,
  ) {}

  async findAll() {
    return this.readingRepo.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const reading = await this.readingRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!reading) throw new NotFoundException('Reading not found');
    return reading;
  }

  async create(dto: CreateReadingDto, user: User) {
    const reading = this.readingRepo.create({
      ...dto,
      author: user,
    });
    return this.readingRepo.save(reading);
  }

  async update(id: number, dto: UpdateReadingDto) {
    const reading = await this.readingRepo.findOne({ where: { id } });
    if (!reading) throw new NotFoundException('Reading not found');
    Object.assign(reading, dto);
    return this.readingRepo.save(reading);
  }

  async remove(id: number) {
    const reading = await this.readingRepo.findOne({ where: { id } });
    if (!reading) throw new NotFoundException('Reading not found');
    await this.readingRepo.remove(reading);
    return { deleted: true };
  }
}
