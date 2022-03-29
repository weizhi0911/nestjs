import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // @PrimaryColumn // 创建主键
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;
}
