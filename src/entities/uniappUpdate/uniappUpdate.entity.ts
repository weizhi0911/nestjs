import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";


@Entity()
export class UniappUpdate {
    // @PrimaryGeneratedColumn()
    // id: number;
    
    @PrimaryColumn({
        type: 'varchar',
        default: ''
      })
    version: string

    @Column()
    update: boolean;

    @Column()
    wgtUrl: string;

    
    // // 一对多关系
    // @OneToMany((type) => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
    // photos: Photo[];
}