import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";



@Injectable()
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, type: string){
    this.snackBar.dismiss()
    this.snackBar.open(message, 'Zamknij', {
      duration: 7500,
      panelClass: 'toast--' + type,
    })
  }

}
