import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  url = ' http://USBLRMMONIKA2.us.deloitte.com:82080';
  httpOptions = [{
     logfile_name : '\\\\10.29.215.255\\Users\\Public\\selfHealingFIStaticFolder\\\\hadoop\\Self-Healing-Output.csv'
  }];


configUrl = 'assets/config.json';

 handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

getConfig() {
  return this.http.get(this.configUrl)
  .pipe(
     retry(3),
     catchError(this.handleError)
  );
}

postResponse() {
  return this.http.post(this.url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

}

