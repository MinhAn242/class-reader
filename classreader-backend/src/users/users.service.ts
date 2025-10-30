import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../common/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // ✅ đúng tên
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } }); // ✅ sửa lại đây
  }

  async create(username: string, password: string, role: UserRole): Promise<User> {
    const newUser = this.usersRepository.create({ username, password, role }); // ✅ sửa lại đây
    return await this.usersRepository.save(newUser); // ✅ sửa lại đây
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    user.role = role;
    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async findById(id: string): Promise<User | null> {
  return await this.usersRepository.findOne({ where: { id } });
}

}
