import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, Unique} from "typeorm";

@Entity()
@Unique(['email', 'username'])
export class User extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    username: string;
    @Column()
    email: string;    
    @Column()
    password: string;
    @Column()
    salt: string;
    @Column()
    isAdmin: boolean;
    @Column()
    passwordReset: boolean;
}
