import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Photo } from "../photo/photo.entity";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  // @OneToOne 允许俩个实体之间创建一对一的关系
  // type => Photo是一个函数，返回我们想要与之建立关系的实体的类
  // type 变量本身不包含任何内容，只是为了可读性
  @OneToOne((type) => Photo)
  @JoinColumn()
  photo: Photo;
}
