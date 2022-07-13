import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: {
    email: string,
    name: string
  }, private mathDialogRef: MatDialogRef<SuccessPopupComponent>) { 
    this.userName = data.name;
    this.userEmail = data.email;
  }

  ngOnInit(): void {
  }

  onOkClose() {
    this.mathDialogRef.close();
  }

}
