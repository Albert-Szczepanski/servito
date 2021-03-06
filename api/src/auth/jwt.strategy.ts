import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import {IAccessToken} from "./auth/auth.model";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "./users/orm/users.repository";
import {User} from "./users/orm/users.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "kdx!iCesXE5Q4o&&pjCKc8i#LbxPN4jQjC6?BNm7",
        });
    }

    async validate(payload: IAccessToken): Promise<User>{
        const { username } = payload;
        const user = await this.usersRepository.findOne({username});

        if (!user){
            throw new UnauthorizedException('Invalid Credentials');
        }

        return user
    }
}
