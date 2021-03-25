import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/home/users/users.component';
import { NavComponent } from './components/home/nav/nav.component';
import { TranslationsService } from './shared/translations/translations.service';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/auth/auth.effects";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesComponent } from './components/home/categories/categories.component';
import { UsersEffects } from "./store/users/users.effects";
import { CategoriesEffects } from "./store/categories/categories.effects";

import * as fromApp from './store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSliderModule } from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastService} from "./shared/services/toast.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { PostsComponent } from './components/home/posts/posts.component';
import { PostComponent } from './components/home/posts/post/post.component';
import { EditorComponent } from './shared/components/editor/editor.component';
import { ServicesComponent } from './components/home/services/services.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import { TinyLoaderComponent } from './shared/components/tiny-loader/tiny-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    NavComponent,
    DashboardComponent,
    AlertComponent,
    LoaderComponent,
    CategoriesComponent,
    PostsComponent,
    PostComponent,
    EditorComponent,
    ServicesComponent,
    TinyLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, UsersEffects, CategoriesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSliderModule,
    MatExpansionModule,
    MatSliderModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [TranslationsService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
