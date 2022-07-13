import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class AppError {
  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('error accured: server is probebly down for a while(Check the Network)'));
    } 
    else if (error.status === 404) {
      return throwError(() => new Error('The resorse wanted not Found:'));
    }
    else if (error.status === 400) {
      return throwError(() => new Error('Bad request: '))
    }
    else if (error.status === 403) {
      return throwError(() => new Error('Access Forbidden!!!'))
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
