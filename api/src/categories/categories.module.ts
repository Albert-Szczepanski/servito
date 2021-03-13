import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoriesRepository} from "./orm/categories.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CategoriesRepository])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
