import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "../../../models/users/user.interface";
import {environment} from "../../../../environments/environment";
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

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  usersState: Observable<State>;

  ngOnInit(): void {
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDRlYmNlYmRlMDEwMTllYjZmNmVjYyIsInVzZXJuYW1lIjoiYWxiZXJ0LnN6Y3plcGFuc2tpIiwiZW1haWwiOiJhbGJlcnQuc3pjemVwYW5za2kwMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwYXNzd29yZFJlc2V0IjpmYWxzZSwiaWF0IjoxNjE1Njc1MzU5LCJleHAiOjE2MTU3MTEzNTl9.rmbou6Se2lEubvmrMn4knef2gIMjiEn-CWmzeS5WkMI')
    };

    this.usersState = this.store.select('users')

    this.http.get<IUser[]>(`${environment.apiUrl}users`, options).subscribe(res => {
      this.store.dispatch(new UsersActions.GetUsersSuccess(res))
      console.log(this.usersState)
    })

  }

}
