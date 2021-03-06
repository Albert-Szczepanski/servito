import {ConflictException, Injectable} from '@nestjs/common';
import { User } from './users/orm/users.entity';
import * as bcrypt from "bcrypt";
import {UsersRepository} from "./users/orm/users.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SharedService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository) {
    }

    async generateSalt(): Promise<string>{
        return await bcrypt.genSalt();
    }

    async getUserInfoByUserName(username: string): Promise<User>{
        return await this.usersRepository.findOne({where: {username: username}});
    }

    async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }

    async saveUser(user: User): Promise<User>{
        await user.save().catch(() => {
            throw new ConflictException(`Email: ${user.email} or username: ${user.username} are already taken`)
        });
        return user;
    }

}

