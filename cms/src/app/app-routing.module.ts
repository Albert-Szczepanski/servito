import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/home/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {UsersComponent} from "./components/home/users/users.component";
import {CategoriesComponent} from "./components/home/categories/categories.component";
import {PostsComponent} from "./components/home/posts/posts.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'posts', component: PostsComponent},
    ] },
  { path: 'login', component: LoginComponent, },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
