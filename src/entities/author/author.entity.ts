import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Photo } from "../photo/photo.entity";


@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    // 一对多关系
    @OneToMany((type) => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
    photos: Photo[];
}