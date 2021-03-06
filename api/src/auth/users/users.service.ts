import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDto } from './dto/user.dto';
import { UsersRepository } from './orm/users.repository';
import { User } from './orm/users.entity';
import * as bcrypt from "bcrypt";
import {SharedService} from "../shared.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) 
                private usersRepository: UsersRepository, private sharedService: SharedService){}

    // TODO Auth i check uprawnien,
    async createUser(userDto: IUserDto): Promise<User>{
        const { username, email, password, passwordReset } = userDto;
        const user = new User();
        user.email = email;
        user.salt = await this.sharedService.generateSalt();1
        user.password = await this.sharedService.hashPassword(password, user.salt);
        user.username = username;
        user.isAdmin = false;
        if (passwordReset){user.passwordReset = passwordReset}
        else{user.passwordReset = false}
        return await this.sharedService.saveUser(user);
    }

    async updateUserInfo(userDto: IUserDto): Promise<User>{
        const { username, email } = userDto;
        const user = await this.usersRepository.findOne(userDto.id)

        if (username) { user.username = username }
        if (email) { user.email = email }

        return await this.sharedService.saveUser(user);
    }

    //TODO, dodać controller
    async changePassword(userDto: IUserDto): Promise<User>{
        const user = await this.usersRepository.findOne(userDto.id)
        const salt = await this.sharedService.generateSalt()
        user.password = await this.sharedService.hashPassword(userDto.password, salt);
        return await this.sharedService.saveUser(user);
    }

    //TODO, dodać controller
    async setAdmin(userDto: IUserDto): Promise<User>{
        const user = await this.usersRepository.findOne(userDto.id)
        user.isAdmin = userDto.isAdmin;
        return await this.sharedService.saveUser(user);
    }

    //TODO, dodać controller
    async setPasswordChange(userDto: IUserDto): Promise<User>{
        const user = await this.usersRepository.findOne(userDto.id)
        user.passwordReset = userDto.passwordReset;
        return await this.sharedService.saveUser(user);
    }

}

