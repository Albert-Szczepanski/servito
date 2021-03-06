import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigDev } from "./type-orm-config/typeorm.config";
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigDev), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
