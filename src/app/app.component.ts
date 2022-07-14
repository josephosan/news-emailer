import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { UserService } from './services/user.service';
import { IpService } from './services/ip.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'news-emailer';
  userIP: string = '';
  userRegion: string = '';
  userIPError: string = '';
  numberOfUsers: string = '';
  serverError: string = '';


  constructor(private http: HttpClient, 
    private ipService: IpService, 
    private userService: UserService,
    private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadIP();
    this.numberOfUsersFinder();
  }

  numberOfUsersFinder() {
    this.userService.getData().subscribe(
      (res: any) => {
        this.numberOfUsers = res;
        console.log(res);
      },
      (err) => {
        console.error(err);
        this.numberOfUsers = '';
      }
    )
  }

  form = new FormGroup({
    name: new FormControl('', 
      [ Validators.required, Validators.maxLength(20), Validators.minLength(2) ]
    ),
    email: new FormControl('',
      [ Validators.required, Validators.minLength(2), Validators.email, Validators.maxLength(30) ]
    )
  });

  onSubmit(data: FormGroup) {
    this.userService.postData(data.value).subscribe(
      (res: any) => {
        // clearing the error field
        this.serverError = '';
        
        this.matDialog.open(SuccessPopupComponent, {
          data: {
            email: data.value.email,
            name: data.value.name
          },
          width: "30rem", 
          maxHeight: "40rem"
        });

        // after all usage; clearing the form.
        data.reset();
      },
      (err) => {
        if(err.status === 400) {
          this.serverError = err.error;
          return;
        } else {
          console.log(err.error);
        }
      }
    )
  }

  // getters
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  // finding out ip address:
  loadIP() {
    this.ipService.getIP().pipe(
      switchMap((value: any) => {
        this.userIP = value.ip;
        let url = `http://api.ipstack.com/${value.ip}?access_key=ae346857eeadab8ddf0036afeffbaa51`;
        return this.http.get(url);
      })
    )
    .subscribe(
      (res: any) => {
        this.userRegion = res.country_name;
        // console.log(this.userRegion);
      },
      (err: any) => {
        this.userIPError = err.message;
      }
    )
  }

  doesUserHaveConditionsToSendEmail() {
    if (this.userRegion === 'Iran') return false;
    return true;
  }
}
