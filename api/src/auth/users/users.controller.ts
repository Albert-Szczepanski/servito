import {Body, Controller, Delete, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { IUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('user')
    getUser(@Body() userDto: IUserDto){
    console.log(userDto);
    return 'User Fetched'
    }

    @Post('user')
    createUser(@Body() userDto: IUserDto){
        return this.usersService.createUser(userDto);
    }

    @Post('user/change-password')
    changePassword(@Body() userDto: IUserDto){
        return this.usersService.changePassword(userDto);
    }

    @Post('user/set-admin')
    setAdmin(@Body() userDto: IUserDto){
        return this.usersService.setAdmin(userDto);
    }

    @Post('user/set-password-change')
    setPasswordChange(@Body() userDto: IUserDto){
        return this.usersService.setPasswordChange(userDto);
    }

    @Delete(':id')
    deleteUser(@Body('id') id: number){
        return 'User Deleted'
    }

    @Patch('user')
    updateUser(@Body() userDto: IUserDto){
        return this.usersService.updateUserInfo(userDto);
    }

    @Post('test')
    test(@Req() req){
        console.log(req)
    }

}
