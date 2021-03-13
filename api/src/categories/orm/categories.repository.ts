import {EntityRepository, Repository} from "typeorm";
import {Category} from "./categories.entity";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category>{



}