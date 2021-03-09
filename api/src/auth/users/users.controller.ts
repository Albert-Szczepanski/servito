import {Body, Controller, Delete, Get, Patch, Post, UseGuards} from '@nestjs/common';
import { IUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../get-user.decorator";
import {User} from "./orm/users.entity";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}


    @Get('')
    @UseGuards(AuthGuard())
    getUsers(@GetUser() user: User){
        return this.usersService.getUsers(user);
    }

    @Post('user')
    @UseGuards(AuthGuard())
    createUser(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.createUser(userDto, user);
    }

    @Post('user/init')
    createFirstAdmin(@Body() userDto: IUserDto){
        return this.usersService.createFirstUser(userDto);
    }

    @Post('user/change-password')
    @UseGuards(AuthGuard())
    changePassword(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.changePassword(userDto, user);
    }

    @Post('user/set-admin')
    @UseGuards(AuthGuard())
    setAdmin(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.setAdmin(userDto, user);
    }

    @Post('user/set-password-change')
    @UseGuards(AuthGuard())
    setPasswordChange(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.setPasswordChange(userDto, user);
    }

    @Delete('user/delete')
    @UseGuards(AuthGuard())
    deleteUser(@Body('id') id: number, @GetUser() user: User){
        return 'User Deleted'
    }

    @Patch('user/update-information')
    @UseGuards(AuthGuard())
    updateUser(@Body() userDto: IUserDto, @GetUser() user: User){
        return this.usersService.updateUserInfo(userDto, user);
    }

    @Post('test-validate-user')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
        return 'Token is valid'
    }

}
