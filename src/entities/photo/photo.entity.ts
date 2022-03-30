import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  // @PrimaryColumn // 创建主键
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;
  @Column({
    type: 'varchar',
  })
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}
