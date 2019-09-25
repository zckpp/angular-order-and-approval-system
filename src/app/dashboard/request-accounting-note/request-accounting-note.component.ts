import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-accounting-note',
  templateUrl: './request-accounting-note.component.html',
  styleUrls: ['./request-accounting-note.component.scss']
})
export class RequestAccountingNoteComponent {

  constructor(
    public dialogRef: MatDialogRef<RequestAccountingNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
