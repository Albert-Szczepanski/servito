import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigDev } from "./type-orm-config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ClientServicesModule } from './client-services/client-services.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigDev), AuthModule, CategoriesModule, ClientServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
