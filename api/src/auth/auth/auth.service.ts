import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "../users/orm/users.repository";
import {IUserDto} from "../users/dto/user.dto";
import {User} from "../users/orm/users.entity";
import {SharedService} from "../shared.service";
import {JwtService} from "@nestjs/jwt";
import {IAccess, IAccessToken} from "./auth.model";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersRepository)
                private usersRepository: UsersRepository,
                private sharedService: SharedService,
                private jwtService: JwtService){}

    async signIn(userDto: IUserDto): Promise<IAccess> {
        const { username, password } = userDto;

        const userInformation = await this.sharedService.getUserInfoByUserName(username);
        const hashedPassword = await this.sharedService.hashPassword(password, userInformation.salt);

        if (hashedPassword !== userInformation.password) {
            throw new UnauthorizedException('Incorrect credentials')
        } else {
            const payload: IAccessToken = {
                id: userInformation.id.toString(),
                username: userInformation.username,
                email: userInformation.email,
                isAdmin: userInformation.isAdmin,
                passwordReset: userInformation.passwordReset }
            const accessToken = await this.jwtService.sign(payload);
            const access: IAccess = {
                accessToken: accessToken,
                username: userInformation.username,
                expireDate: new Date()}
            return access }
    }
}
