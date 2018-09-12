import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CbApiService {

  private config: any;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  login(payload: object) {
    const pathEndPoint = 'login/';
    return (this.http
      .post<any>(this.config.apiUrl + pathEndPoint, payload, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
    );
  }

  // ###### TEMPORARY DATA ######## !!!!!!!!!!!
  //
  // REMOVE LATER -- IT POINT DIRECTLY ON BINANCE API
  //
  // NEED CORS HEADER EXTANSION TO RUN ON FRONT

  trades(currency: string, limit: number) {
    const pathEndPoint = 'https://api.binance.com/api/v1/trades?symbol=' + currency + '&limit=' + limit;
    return (this.http.get<any>(pathEndPoint).pipe(catchError(this.handleError)));
  }

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
}
