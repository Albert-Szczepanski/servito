import {Component, OnInit} from '@angular/core';
import {TranslationsService} from '../../shared/translations/translations.service';
import {Store} from "@ngrx/store";
import {AuthRequestModel} from "../../models/auth/auth-request.model";
import * as LoginActions from '../../store/auth/auth.actions';
import * as UsersActions from '../../store/users/users.actions';
import * as fromApp from '../../store/app.reducer';
import {NgForm} from "@angular/forms";
import {State} from "../../store/auth/auth.reducer";
import {Observable} from "rxjs";
import {AlertEnum} from "../../shared/components/alert/alert.enum";
import {User} from "../../models/auth/user.model";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../shared/services/toast.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    public translationsService: TranslationsService,
    private store: Store<fromApp.AppState>) { }

  authState: Observable<State>
  alertEnum = AlertEnum;
  isFirstLogin = false;

  ngOnInit(): void {
    this.authState = this.store.select('auth');
    if (localStorage.getItem('username') && localStorage.getItem('accessToken')){
      const user = new User()
      user.username = localStorage.getItem('username');
      user.accessToken = localStorage.getItem('accessToken');
      this.store.dispatch(new LoginActions.GetTokenSuccess(user))
    }
    const firstLogin = this.route.snapshot.queryParams
    if (firstLogin['FirstTime']){
      this.isFirstLogin = true;
    }

  }

  getAuthToken(form: NgForm): void{
    const auth = new AuthRequestModel()
    auth.username = form.value.username;
    auth.password = form.value.password;
    this.store.dispatch(new LoginActions.GetTokenStart(auth))
  }

  userCreate(form: NgForm): void {
    const password = form.value.passwordreg;
    const repeatPassword = form.value.repasswordreg;
    const username = form.value.usernamereg;
    const email = form.value.email
    let passwordsMatch: boolean;
    passwordsMatch = password === repeatPassword;
    let message =  '';
    if (!passwordsMatch){message = message + 'Hasła się róźnią '}
    if (!username){message = message + 'Brak nazwy użytkownika '}
    if (!email){message = message + 'Nieprawidłowy mail '}
    if (!password){message = message + 'Błędne hasło '}
    this.toast.showSnackBar(message, 'alert')
    this.store.dispatch(new UsersActions.CreateInitialUserStart({email: email, password: password, username: username}))
  }
}
