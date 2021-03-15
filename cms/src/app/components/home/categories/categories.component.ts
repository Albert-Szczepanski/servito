import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {Observable} from "rxjs";
import {State} from "../../../store/categories/categories.reducer";
import * as CategoryActions from "../../../store/categories/categories.actions"
import {AlertEnum} from "../../../shared/components/alert/alert.enum";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  categoriesState: Observable<State>
  alertEnum = AlertEnum;

  ngOnInit(): void {
    this.categoriesState = this.store.select("categories")
    this.store.dispatch(new CategoryActions.GetCategoriesStart())
  }

}
