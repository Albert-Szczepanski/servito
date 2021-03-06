import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDto } from './dto/user.dto';
import { UsersRepository } from './orm/users.repository';
import { User } from './orm/users.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) 
                private usersRepository: UsersRepository){}

    // TODO Auth i check uprawnien,
    async createUser(userDto: IUserDto): Promise<User>{
        const { username, email, password } = userDto;
        const user = new User();
        const salt = await bcrypt.genSalt();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        user.username = username;
        user.isAdmin = false;
        user.passwordReset = true;
        return await this.saveUser(user);
    }

    async saveUser(user: User): Promise<User>{
        await user.save().catch(() => {
            throw new ConflictException(`Email: ${user.email} or username: ${user.username} are already taken`)
        });
        return user;
    }

    async updateUserInfo(userDto: IUserDto): Promise<User>{
        const { username, email } = userDto;
        const user = await this.usersRepository.findOne(userDto.id)

        if (username) { user.username = username }
        if (email) { user.email = email }

        return await this.saveUser(user);
    }

    //TODO, dodać controller
    async changePassword(userDto: IUserDto): Promise<User>{
        const user = await this.usersRepository.findOne(userDto.id)
        const salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(userDto.password, salt);
        return await this.saveUser(user);
    }

    //TODO, dodać controller
    async setAdmin(userDto: IUserDto): Promise<User>{
        const user = await this.usersRepository.findOne(userDto.id)

        return await this.saveUser(user);
    }

    //TODO bcrypt
    private async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }

}

