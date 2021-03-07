import {Component, OnDestroy, OnInit} from '@angular/core';
import {InfoService} from '../shared/info/info.service';
import {AuthService} from '../shared/auth/auth.service';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthRequestModel} from "../shared/auth/models/auth-request.model";
import * as LoginActions from '../shared/auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public infoService: InfoService, private auth: AuthService, private store: Store<fromApp.AppState>) { }
  isAuth: boolean;
  private subscriptions = new Subscription();

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  //TODO przerobić na NGRXa
  getAuthToken(login:string, password:string): void{
    this.isAuth = false;
    const test = new AuthRequestModel()

    // note for self
    test.username = login;
    test.password = password;
    this.store.dispatch(new LoginActions.GetTokenStart(test))
  }
}
