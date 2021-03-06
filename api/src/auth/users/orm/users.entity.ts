import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, Unique} from "typeorm";

@Entity()
@Unique(['email', 'username'])
export class User extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    @Column({ unique: true })
    username: string;
    @Column({ unique: true })
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
