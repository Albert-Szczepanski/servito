import {Component, OnInit} from '@angular/core';
import {TranslationsService} from './shared/translations/translations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private infoService: TranslationsService) {
  }
  title = 'cms';

  ngOnInit(): void{
    this.infoService.setLanguage();
  }
}
