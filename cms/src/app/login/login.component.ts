import { Component, OnInit } from '@angular/core';
import {InfoService} from '../shared/info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public infoService: InfoService) { }

  ngOnInit(): void {
  }

}
