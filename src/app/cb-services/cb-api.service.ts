import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CbConstants } from '../cb-shared/cb-constants';

interface RequestDefinition {
  PATH: string;
  METHOD: string;
}

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

  constructor(private http: HttpClient) {
    this.setUpDefaultConfig();
  }

  setUpDefaultConfig() {
    this.config = {
      apiUrl: CbConstants.API_ENDPOINT
    };
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  trades(currency: string, limit: number) {
    const pathEndPoint =
      'https://api.binance.com/api/v1/trades?symbol=' +
      currency +
      '&limit=' +
      limit;
    return this.http.get<any>(pathEndPoint).pipe(catchError(this.handleError));
  }

  // login(payload: object) {
  //   const pathEndPoint = 'login/';
  //   return (this.http
  //     .post<any>(this.config.apiUrl + pathEndPoint, payload, this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  //   );
  // }

  genericRequest(
    _REQUEST: RequestDefinition,
    _PAYLOAD?: any,
    _OPTIONS?: any
  ): Observable<any> {
    console.log(_REQUEST);
    switch (_REQUEST.METHOD) {
      case 'GET':
        return this.GET(_REQUEST.PATH);
      case 'POST':
        return this.POST(_REQUEST.PATH, _PAYLOAD);
    }
  }

  private GET(_ENDPOINT: string): Observable<any> {
    return this.http
      .get<any>(this.config.apiUrl + _ENDPOINT, this.httpOptions);
      // .pipe(catchError(this.handleError));
  }

  private POST(_ENDPOINT: string, _PAYLOAD: any): Observable<any> {
    return this.http
      .post<any>(this.config.apiUrl + _ENDPOINT, _PAYLOAD, this.httpOptions);
      // .pipe(catchError(this.handleError));
  }
}
