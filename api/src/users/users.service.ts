import {ConflictException, Injectable} from '@nestjs/common';
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
        await user.save().catch(err => {
            throw new ConflictException(`Email: ${email} or username: ${username} already taken`)
        });
        return user;
    }

    //TODO tworzenie pierwszego admina
    // async createFirstUser(userDto: IUserDto){
    //     const { username, email, password } = userDto;
    //     const user = new User();
    //     user.email = email;
    //     user.password = password;
    //     user.username = username;
    //     user.isAdmin = false;
    //     user.passwordReset = true;
    //     await user.save();
    //     return user;
    // }

    async updateUserInfo(userDto: IUserDto): Promise<User>{
        const user = this.usersRepository.findOne(userDto.id);
        if (await user){
            return user;
        }else{
            console.log(user)
        }
    }

    //TODO bcrypt
    private async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }

}

