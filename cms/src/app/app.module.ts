import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { NavComponent } from './home/nav/nav.component';
import { InfoService } from './shared/info.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth.service';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login/store/login.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({login: loginReducer}),
    StoreModule.forRoot({}, {})
  ],
  providers: [InfoService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
