import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import * as LoginActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  navigateTo(routeToNavigate: string): void{
    this.router.navigate(['home/'+routeToNavigate])
  }

  logOut(){
    this.store.dispatch(new LoginActions.Logout());
  }


}
