import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {Observable} from "rxjs";
import {State} from "../../../store/categories/categories.reducer";
import * as CategoryActions from "../../../store/categories/categories.actions"
import {AlertEnum} from "../../../shared/components/alert/alert.enum";
import {NgForm} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private snackBar: MatSnackBar, private toastService: ToastService) { }

  categoriesState: Observable<State>
  alertEnum = AlertEnum;
  addCategoryFormVisible = false;
  sliderValue = 5;

  ngOnInit(): void {
    this.categoriesState = this.store.select("categories")
  }

  switchAddCategoryFormState(): void {
    this.addCategoryFormVisible = !this.addCategoryFormVisible
  }

  onAddCategory(form: NgForm): void {
    const name: string = form.value.categoryName;
    const priority: number = form.value.categoryRange;
    this.store.dispatch(new CategoryActions.AddCategoryStart({name, priority}))
  }

  onEditCategory(id: string, form:NgForm): void{

    const name: string = form.value.categoryName;
    const priority: number = form.value.categoryPriority;

    this.store.dispatch(new CategoryActions.EditCategoryStart({id, name, priority}))
  }

  onDeleteCategory(id: string, name: string, priority: number): void{
    this.store.dispatch(new CategoryActions.DeleteCategoryStart({id, name, priority}))
  }

}
