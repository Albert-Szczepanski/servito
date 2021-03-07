import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
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

    async createUser(userDto: IUserDto, reqUser: User): Promise<User>{
        console.log(reqUser)
        await this.sharedService.checkIfAdmin(reqUser);
        const { username, email, password, passwordReset } = userDto;
        const user = new User();
        user.email = email;
        user.salt = await this.sharedService.generateSalt();
        user.password = await this.sharedService.hashPassword(password, user.salt);
        user.username = username;
        user.isAdmin = false;
        if (passwordReset){user.passwordReset = passwordReset}
        else{user.passwordReset = false}
        return await this.sharedService.saveUser(user);
    }

    async updateUserInfo(userDto: IUserDto, reqUser: User): Promise<User>{
        await this.sharedService.checkIfAdmin(reqUser);
        const { username, email } = userDto;

        if (username) { reqUser.username = username }
        if (email) { reqUser.email = email }

        return await this.sharedService.saveUser(reqUser);
    }

    //TODO, przemyśleć strategię zmiany hasła

    //TODO, dodać controller
    async changePassword(userDto: IUserDto, reqUser: User): Promise<User>{
        reqUser.password = await this.sharedService.hashPassword(userDto.password, reqUser.salt);
        return await this.sharedService.saveUser(reqUser);
    }

    //TODO, dodać controller
    async setAdmin(userDto: IUserDto, reqUser: User): Promise<User>{
        await this.sharedService.checkIfAdmin(reqUser);
        const userToAdmin = await this.usersRepository.findOne(userDto.id)
        userToAdmin.isAdmin = userDto.isAdmin;
        return await this.sharedService.saveUser(reqUser);
    }

    //TODO, dodać controller
    async setPasswordChange(userDto: IUserDto, reqUser: User): Promise<User>{
        reqUser.passwordReset = userDto.passwordReset;
        return await this.sharedService.saveUser(reqUser);
    }

}
