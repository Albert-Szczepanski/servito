import {Component, OnInit} from '@angular/core';
import {TranslationsService} from '../../shared/translations/translations.service';
import {Store} from "@ngrx/store";
import {AuthRequestModel} from "../../models/auth/auth-request.model";
import * as LoginActions from '../../store/auth/auth.actions';
import * as fromApp from '../../store/app.reducer';
import {NgForm} from "@angular/forms";
import {State} from "../../store/auth/auth.reducer";
import {Observable} from "rxjs";
import {AlertEnum} from "../../shared/components/alert/alert.enum";
import {User} from "../../models/auth/user.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public infoService: TranslationsService, private store: Store<fromApp.AppState>) { }

  authState: Observable<State>
  alertEnum = AlertEnum;

  ngOnInit(): void {
    this.authState = this.store.select('auth');
    if (localStorage.getItem('username') && localStorage.getItem('accessToken')){
      const user = new User()
      user.username = localStorage.getItem('username');
      user.accessToken = localStorage.getItem('accessToken');
      this.store.dispatch(new LoginActions.GetTokenSuccess(user))
    }
  }

  getAuthToken(form: NgForm): void{
    const auth = new AuthRequestModel()
    auth.username = form.value.username;
    auth.password = form.value.password;
    this.store.dispatch(new LoginActions.GetTokenStart(auth))
  }
}
