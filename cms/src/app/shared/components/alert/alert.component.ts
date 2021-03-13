import {Component, Input, OnInit} from '@angular/core';
import {AlertEnum} from "./alert.enum";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input()
  message: string;
  @Input()
  alertType: AlertEnum;
}
