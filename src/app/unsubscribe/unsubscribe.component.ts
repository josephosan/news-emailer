import { UserService } from './../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  serverError: string = '';
  serverResponse: string = '';


  form = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(30) ])
  });

  constructor(private matDialogRef: MatDialogRef<UnsubscribeComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(data: FormGroup) {
    this.userService.deleteData(data.value).subscribe(
      (res: any) => {
        this.serverError = '';
        this.serverResponse = res.message;

        data.reset();
      }, 
      (err) => {
        data.reset();
        this.serverResponse = '';
        this.serverError = err.error.message;
      }
    )
  }

  doesUserHaveConditionsToDeleteEmail() {
    return true;
  }

  onCloseUnsubscribe() {
    this.serverError = '';
    this.serverResponse = '';
    this.matDialogRef.close();
  }

  // getters :
  get email() {
    return this.form.get('email');
  }

}
