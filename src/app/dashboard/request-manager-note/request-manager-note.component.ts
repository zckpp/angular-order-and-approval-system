import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-manager-note',
  templateUrl: './request-manager-note.component.html',
  styleUrls: ['./request-manager-note.component.scss']
})
export class RequestManagerNoteComponent {

  constructor(
    public dialogRef: MatDialogRef<RequestManagerNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
