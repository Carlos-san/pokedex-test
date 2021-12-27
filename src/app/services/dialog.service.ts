import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private readonly dialog: MatDialog
  ) { }

  showDialog(title: string, message: string, type= 'info', onSuccess: any): void{
    const dialogRef = this.dialog.open(DialogComponent, { disableClose: true });
    const dialogInstance = dialogRef.componentInstance;

    dialogInstance.type = type;
    dialogInstance.title = title;
    dialogInstance.message = message;
    dialogInstance.submitAction = onSuccess;
  }
}
