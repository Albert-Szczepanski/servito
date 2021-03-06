import {Body, Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { IUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
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

    @Delete(':id')
    deleteUser(@Body('id') id: number){
        return 'User Deleted'
    }

    @Patch('user')
    updateUser(@Body() userDto: IUserDto){
        return this.usersService.updateUserInfo(userDto);
    }

}
