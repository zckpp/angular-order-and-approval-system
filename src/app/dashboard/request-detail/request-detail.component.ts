import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent {

  spinner: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RequestDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public captureScreen(src: string):void {
    const content = document.getElementById('contentToDownload');
    // show spinner
    this.spinner = true;
    // set height to show overflow
    content.style.maxHeight = '3000px';
    content.style.overflow = 'visible';
    html2canvas(content).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('order-receipt.pdf'); // Generated PDF
      // hide spinner
      this.spinner = false;
      // revert height settings
      content.style.maxHeight = '65vh';
      content.style.overflow = 'auto';
    });
  }
}
