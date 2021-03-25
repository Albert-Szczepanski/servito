import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import * as UsersActions from "../../../store/users/users.actions"
import {Observable} from "rxjs";
import {State} from "../../../store/users/users.reducer";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  usersState: Observable<State>;
  addUserFormVisible = false;

  ngOnInit(): void {
    this.usersState = this.store.select('users')
  }

  onShowUserForm(): void{
    this.addUserFormVisible = !this.addUserFormVisible
  }

  onAddUser(form: NgForm): void{
    const username = form.value.userName;
    const email = form.value.userMail;
    //TODO obsługa nowego usera hasło itp
    const password = username;
    console.log(form.value)
    this.store.dispatch(new UsersActions.CreateUserStart({username: username, password: password, email: email}))
  }

}


