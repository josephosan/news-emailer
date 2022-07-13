import { AppError } from './../errors/AppError';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';

const appError = new AppError();

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient ) { }

  getData() {
    return this.http.get(this.url).pipe(
      catchError(appError.handleError)
    );
  }

  postData(data: any) {
    return this.http.post(this.url, data);
  }
}
