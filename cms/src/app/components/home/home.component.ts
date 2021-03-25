import { Component, OnInit } from '@angular/core';
import * as fromApp from "../../store/app.reducer";
import * as UsersActions from "../../store/users/users.actions"
import * as CategoriesActions from "../../store/categories/categories.actions"
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new UsersActions.GetUsersStart())
    this.store.dispatch(new CategoriesActions.GetCategoriesStart())
  }

}
