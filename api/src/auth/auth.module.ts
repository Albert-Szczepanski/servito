import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users/orm/users.repository';
import { AuthService } from './auth/auth.service';
import { AuthController } from "./auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SharedService } from "./shared.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: "kdx!iCesXE5Q4o&&pjCKc8i#LbxPN4jQjC6?BNm7",
      signOptions: {
        expiresIn: 36000,
      },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, SharedService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, SharedService]
})
export class AuthModule {}
