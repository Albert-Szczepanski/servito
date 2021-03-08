import {Component, OnInit} from '@angular/core';
import {TranslationsService} from '../../shared/translations/translations.service';
import {Store} from "@ngrx/store";
import {AuthRequestModel} from "../../models/auth/auth-request.model";
import * as LoginActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/app.reducer';
import {NgForm} from "@angular/forms";
import {State} from "../../store/auth/auth.reducer";
import {Observable} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public infoService: TranslationsService, private store: Store<fromApp.AppState>) { }
  authState: Observable<State>
  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  //TODO przerobić na NGRXa
  getAuthToken(form: NgForm): void{
    const test = new AuthRequestModel()
    test.username = form.value.username;
    test.password = form.value.password;
    this.store.dispatch(new LoginActions.GetTokenStart(test))
  }
}