import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-manager-decline',
  templateUrl: './request-manager-decline.component.html',
  styleUrls: ['./request-manager-decline.component.scss']
})
export class RequestManagerDeclineComponent {

  constructor(
    public dialogRef: MatDialogRef<RequestManagerDeclineComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
