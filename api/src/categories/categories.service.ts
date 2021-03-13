import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CategoriesRepository} from "./orm/categories.repository";
import {Category} from "./orm/categories.entity";
import {CategoryDto} from "./dto/category.dto";
import {User} from "../auth/users/orm/users.entity";
import {SharedService} from "../auth/shared.service";

@Injectable()
export class CategoriesService {
    ObjectId = require('mongodb').ObjectId;
    constructor(
        @InjectRepository(CategoriesRepository)
        private categoriesRepository: CategoriesRepository,
        private authSharedService: SharedService
    ) {
    }

    async createCategory(categoryDto: CategoryDto, user: User): Promise<Category>{
        await this.authSharedService.checkIfAdmin(user)
        const {name, priority} = categoryDto;
        const category = new Category()
        category.name = name;
        category.priority = priority;
        await category.save()
        return category;
    }

    async deleteCategory(id: string, user:User): Promise<Category>{
        await this.authSharedService.checkIfAdmin(user);
        const result = await this.categoriesRepository.findOne({where : {id: this.ObjectId(id)}});
        if (!result){throw new NotFoundException('Object not found')}
        await result.remove()
        return result;
    }

    async updateCategory(categoryDto: CategoryDto, user:User): Promise<Category>{
        await this.authSharedService.checkIfAdmin(user);
        const {id, name, priority} = categoryDto
        const result: Category = await this.categoriesRepository.findOne(id);
        result.priority = priority;
        result.name = name;
        await result.save()
        return result;
    }

    async getAllCategories(): Promise<Category[]>{
        return await this.categoriesRepository.find()
    }
}