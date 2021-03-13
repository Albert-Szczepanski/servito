import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CategoryDto} from "./dto/category.dto";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/users/orm/users.entity";
import {CategoriesService} from "./categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {
    }

    @Get()
    getAllCategories(){
        return this.categoriesService.getAllCategories();
    }

    @Post('category/create')
    @UseGuards(AuthGuard())
    createCategory(@Body() categoryDto: CategoryDto, @GetUser() user: User){
        return this.categoriesService.createCategory(categoryDto, user);
    }

    @Delete('category/delete/:id')
    @UseGuards(AuthGuard())
    deleteCategory(@Param('id') id: string, @GetUser() user: User){
        return this.categoriesService.deleteCategory(id, user);
    }

    @Patch('category/update')
    @UseGuards(AuthGuard())
    updateCategory(@Body() categoryDto: CategoryDto, @GetUser() user: User){
        console.log(categoryDto)
        return this.categoriesService.updateCategory(categoryDto, user);
    }
}
