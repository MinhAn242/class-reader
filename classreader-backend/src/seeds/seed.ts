import { DataSource } from 'typeorm';
import { User, UserRole } from '../common/entities/user.entity';
import { Reading } from '../common/entities/reading.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // sửa lại nếu cần
  password: 'minhan242@', // sửa lại nếu cần
  database: 'classreader',
  entities: [User, Reading],
});

async function seed() {
  await AppDataSource.initialize();

  // ======= Seed Users =======
  const passwordHash = await bcrypt.hash('123456', 10);
  const usersData = [
    { username: 'admin', password: passwordHash, role: UserRole.ADMIN },
    { username: 'teacher', password: passwordHash, role: UserRole.TEACHER },
    { username: 'student', password: passwordHash, role: UserRole.STUDENT },
    // Thêm user mẫu khác nếu muốn:
    { username: 'author1', password: passwordHash, role: UserRole.TEACHER },
    { username: 'author2', password: passwordHash, role: UserRole.TEACHER },
  ];

  const userRepo = AppDataSource.getRepository(User);
  // Chỉ seed user nếu chưa có
  for (const user of usersData) {
    const exist = await userRepo.findOne({ where: { username: user.username } });
    if (!exist) await userRepo.save(user);
  }

  // ======= Lấy thông tin user để seed đọc =======
  const adminUser = await userRepo.findOne({ where: { username: 'admin' } });
  const author1 = await userRepo.findOne({ where: { username: 'author1' } });
  const author2 = await userRepo.findOne({ where: { username: 'author2' } });

  // ======= Seed Readings =======
  const readingsData = [
    {
      title: 'Bài đọc 1',
      author: adminUser ? { id: adminUser.id } : undefined,
      summary: 'Tóm tắt bài đọc 1',
      content: 'Nội dung đầy đủ...',
      category: 'Văn học',
    },
    {
      title: 'Bài đọc 2',
      author: adminUser ? { id: adminUser.id } : undefined,
      summary: 'Tóm tắt bài đọc 2',
      content: 'Nội dung bài 2...',
      category: 'Khoa học',
    },
    // Thêm reading mẫu khác, gán author là các user ở trên
    {
      title: 'Bài đọc nâng cao',
      author: author1 ? { id: author1.id } : undefined,
      summary: 'Tóm tắt nâng cao',
      content: 'Một nội dung nâng cao về văn học...',
      category: 'Văn học',
    },
    {
      title: 'Bài đọc khoa học mới',
      author: author2 ? { id: author2.id } : undefined,
      summary: 'Tóm tắt khoa học mới',
      content: 'Nội dung bài khoa học mới...',
      category: 'Khoa học',
    },
  ];

  const readingRepo = AppDataSource.getRepository(Reading);
  for (const reading of readingsData) {
    // Kiểm tra đã tồn tại chưa (theo title)
    const exist = await readingRepo.findOne({ where: { title: reading.title } });
    if (!exist) await readingRepo.save(reading);
  }

  await AppDataSource.destroy();
  console.log('Seed xong!');
}

seed();