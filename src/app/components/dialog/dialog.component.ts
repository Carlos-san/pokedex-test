import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pkm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title?: string;

  message?: string;

  submitAction: any;

  type = 'info';

  constructor(
    private readonly dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit( ): void {
  }

  onSubmit() {
    this.submitAction();
    this.dialogRef.close();
  }

}
