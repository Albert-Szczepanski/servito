import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as CategoriesState from '../../../store/categories/categories.reducer'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  addServiceFormVisible = false;

  CategoriesState: Observable<CategoriesState.State>

  ngOnInit(): void {
    this.CategoriesState = this.store.select("categories")
  }

  onShowServiceForm(){
    this.addServiceFormVisible = !this.addServiceFormVisible;
  }

}
