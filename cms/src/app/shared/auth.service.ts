import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthRequestModel} from './models/auth-request.model';
import {environment} from '../../environments/environment';
import {IAuthToken} from './models/auth-token.model';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient){}

  getAuthToken(login, password): Observable<IAuthToken> {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new AuthRequestModel();
    body.grantType = 'Bearer';
    body.password = password;
    body.username = login;

    const requestBody = `grant_type=${body.grantType}&password=${body.password}&username=${body.username}`;
    return this.http.post<IAuthToken>(environment.apiUrl + 'auth/sign-in', requestBody, options);
  }
}
