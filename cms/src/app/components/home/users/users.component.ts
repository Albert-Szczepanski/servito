import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import * as UsersActions from "../../../store/users/users.actions"
import {Observable} from "rxjs";
import {State} from "../../../store/users/users.reducer";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  usersState: Observable<State>;

  ngOnInit(): void {
    this.usersState = this.store.select('users')
    this.store.dispatch(new UsersActions.GetUsersStart())
  }
}
