import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany, PrimaryColumn } from 'typeorm';
import { PhotoMetadata } from '../photoMetadata/photoMetadata.entity'
import { Author } from "../author/author.entity";
import { Albums } from "../albums/albums.entity";

@Entity()
export class Photo {
  // @PrimaryColumn // 创建主键
  @PrimaryGeneratedColumn() // 自动生成id
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  // @Column({
  //   type: "longblob",
  //   default:null
  // })
  // imgFile: any;

  @Column({
    type: "varchar",
    default: ''
  })
  url: string;

  @Column({
    type: 'varchar',
    default: ''
  })
  description: string;

  @Column({
    type: 'varchar',
  })
  filename: string;

  @Column({
    type: 'timestamp',
  })
  createTime: string;

  // 一对一关系
  // 添加PhotoMetadata的反向关系
  // * cascade可以在保存其他对象的同时保存相关对象，接口方法里记得要改连接关系
  @OneToOne((type) => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
    cascade: true,
  })
  metadata: PhotoMetadata;


  // 多对一关系
  @ManyToOne((type) => Author, (author) => author.photos, {
    cascade: true,
  })
  author: Author;

  // 多对多关系
  @ManyToMany((type) => Albums, (album) => album.photos, {
    cascade: true,
  })
  albums: Albums[];
}
