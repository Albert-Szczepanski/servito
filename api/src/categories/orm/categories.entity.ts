import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";
import {Unique} from "typeorm";

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {

    @ObjectIdColumn()
    id: string;
    @Column({unique: true})
    name: string;
    @Column()
    priority: number;

}