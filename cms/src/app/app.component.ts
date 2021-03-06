import {Component, OnInit} from '@angular/core';
import {InfoService} from './shared/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private infoService: InfoService) {
  }
  title = 'cms';

  ngOnInit(): void{
    this.infoService.setLanguage();
  }
}
