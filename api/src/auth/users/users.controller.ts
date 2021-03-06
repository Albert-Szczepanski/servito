import {Body, Controller, Delete, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { IUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../get-user.decorator";
import {User} from "./orm/users.entity";

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private usersService: UsersService){}


    @Post('user')
    createUser(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.createUser(userDto, user);
    }

    @Post('user/change-password')
    changePassword(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.changePassword(userDto, user);
    }

    @Post('user/set-admin')
    setAdmin(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.setAdmin(userDto, user);
    }

    @Post('user/set-password-change')
    setPasswordChange(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.setPasswordChange(userDto, user);
    }

    @Delete('user/delete')
    deleteUser(@Body('id') id: number, @GetUser() user: User){
        return 'User Deleted'
    }

    @Patch('user/update-information')
    updateUser(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.updateUserInfo(userDto, user);
    }

    @Post('test-validate-user')
    test(@GetUser() user: User){
        console.log(user);
        return 'Token is valid'
    }

}
