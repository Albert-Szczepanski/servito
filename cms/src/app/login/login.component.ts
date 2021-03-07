import {Component, OnDestroy, OnInit} from '@angular/core';
import {InfoService} from '../shared/info.service';
import {AuthService} from '../shared/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public infoService: InfoService, private auth: AuthService) { }
  isAuth: boolean;
  private subscriptions = new Subscription();

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAuthToken(){
    this.isAuth = false;
    this.subscriptions.add(this.auth.getAuthToken('albert.szczepanski', 'Tes3mze').subscribe(data => {
      console.log(data);
    }, error => {
      this.isAuth = true;
    }));
  }
}
