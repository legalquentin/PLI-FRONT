import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbStorageService } from './cb-storage.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

interface RequestDefinition {
  PATH: string;
  METHOD: string;
}

@Injectable({
  providedIn: 'root'
})
export class CbApiService {
  private config = {
    apiUrl: CbConstants.API_ENDPOINT
  };

  private httpOptions = {
    headers: new HttpHeaders({})
  };

  constructor(
    private http: HttpClient,
    private _CbStorageService: CbStorageService
  ) {}

  private getOptions() {
    const options = this.httpOptions;
    if (this._CbStorageService.isAuthenticated()) {
      options.headers = this.httpOptions.headers.set(
        'Authorization',
        'Bearer ' + this._CbStorageService.getSessionToken()
      );
    }
    return options;
  }

  private handleError(error: HttpErrorResponse) {
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

  public genericRequest(
    _REQUEST: RequestDefinition,
    _PAYLOAD?: any,
    _OPTIONS?: any
  ): Observable<any> {
    console.log(_REQUEST);
    switch (_REQUEST.METHOD) {
      case 'GET':
        return this.GET(_REQUEST.PATH, _PAYLOAD);
      case 'POST':
        return this.POST(_REQUEST.PATH, _PAYLOAD);
      case 'PUT':
        return this.PUT(_REQUEST.PATH, _PAYLOAD);
    }
  }

  private GET(_ENDPOINT: string, _PARAMETERS?: Array<any>): Observable<any> {
    if (_PARAMETERS) {
      for (const param of _PARAMETERS) {
        _ENDPOINT += '/' + param;
      }
    }
    return this.http.get<any>(
      this.config.apiUrl + _ENDPOINT,
      this.getOptions()
    );
  }

  private POST(_ENDPOINT: string, _PAYLOAD: any): Observable<any> {
    if ('URL_PARAM' in _PAYLOAD) {
      for (const param of _PAYLOAD.URL_PARAM) {
        _ENDPOINT += '/' + param;
      }
      delete _PAYLOAD['URL_PARAM'];
    }
    return this.http.post<any>(
      this.config.apiUrl + _ENDPOINT,
      _PAYLOAD,
      this.getOptions()
    );
  }

  private PUT(_ENDPOINT: string, _PAYLOAD: any): Observable<any> {
    return this.http.put<any>(
      this.config.apiUrl + _ENDPOINT,
      _PAYLOAD,
      this.getOptions()
    );
    // .pipe(catchError(this.handleError));
  }
}
