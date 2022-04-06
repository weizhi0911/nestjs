import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  // @PrimaryColumn // 创建主键
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @CreateDateColumn()
  date: Date

  @Column({
    type: 'varchar',
    length: 20,
  })
  username: string;

  @Column({
    type: 'varchar'
  })
  password: string;

  @Column({
    type: 'varchar',
    default: null
  })
  age: number;

  @Column({
    type: 'varchar',
    default: null
  })
  gender: string;

  @Column({
    type: 'varchar',
    default: null
  })
  email: string; 
  
  @Column({
    type: 'varchar',
    default: null
  })
  mobile: string;

  @Column({
    type: 'varchar',
    default: null
  })
  status: number;
}
