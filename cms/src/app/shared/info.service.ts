import {Injectable} from '@angular/core';
import * as translation from './translations';
import {ITranslations} from './translations.model';

@Injectable()
export class InfoService {
  translations: ITranslations;

  setLanguage(){
    this.translations = translation.pl;
  }
}
