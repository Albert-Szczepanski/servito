import {Body, Controller, Get, Post,} from '@nestjs/common';
import {IUserDto} from "../users/dto/user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService){}

    @Post('sign-in')
    signIn(@Body() userDto: IUserDto){
        return this.auth.signIn(userDto);
    }

}
