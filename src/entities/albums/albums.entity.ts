import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Photo } from "../photo/photo.entity";

@Entity()
export class Albums {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Photo, (photo) => photo.albums)

    // @JoinTable需要指定这是关系的所有者方。
    @JoinTable()
    photos: Photo[];
}