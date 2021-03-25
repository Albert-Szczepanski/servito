import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from '../../../store/app.reducer'
import {Observable} from "rxjs";
import * as UsersState from "../../../store/users/users.reducer";
import * as CategoriesState from '../../../store/categories/categories.reducer'
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  UsersState: Observable<UsersState.State>;
  CategoriesState: Observable<CategoriesState.State>

  ngOnInit(): void {
    this.UsersState = this.store.select("users");
    this.CategoriesState = this.store.select("categories");
  }

  navigateTo(routeToNavigate: string): void{
    this.router.navigate(['home/'+routeToNavigate])
  }

}
