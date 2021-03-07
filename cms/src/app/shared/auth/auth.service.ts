import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthRequestModel} from './models/auth-request.model';
import {environment} from '../../../environments/environment';
import {IAuthToken} from './models/auth-token.model';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";


@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store<fromApp.AppState>){}

  getAuthToken(login, password): Observable<IAuthToken> {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new AuthRequestModel();
    body.password = password;
    body.username = login;

    const requestBody = `grant_type=Bearer&password=${body.password}&username=${body.username}`;
    const request = this.http.post<IAuthToken>(environment.apiUrl + 'auth/sign-in', requestBody, options);

    return request;
  }
}
