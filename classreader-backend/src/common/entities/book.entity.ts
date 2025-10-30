import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  summary: string;

  @Column()
  grade: number;

  @Column()
  difficulty: number;

  @Column()
  topic: string;
}
