import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbStorageService } from './cb-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

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
    private router: Router,
    private dialogRef: MatDialog,
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

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
      if (error.status === 403) {
        this._CbStorageService.clearSession();
        this.dialogRef.closeAll();
        this.router.navigate(['/']);
        return throwError(error.message);
      }
      return throwError('GENERIC_ERROR');
    }
    if (error.error.message) {
      return throwError(error.error.message);
    } else {
      return throwError('GENERIC_ERROR');
    }
  }

  public genericRequest(
    _REQUEST: RequestDefinition,
    _PAYLOAD?: any,
    _OPTIONS?: any
  ): Observable<any> {
    switch (_REQUEST.METHOD) {
      case 'GET':
        return this.GET(_REQUEST.PATH, _PAYLOAD);
      case 'POST':
        return this.POST(_REQUEST.PATH, _PAYLOAD);
      case 'PUT':
        return this.PUT(_REQUEST.PATH, _PAYLOAD);
      case 'DELETE':
        return this.DELETE(_REQUEST.PATH, _PAYLOAD);
    }
  }

  private GET(_ENDPOINT: string, _PARAMETERS?: any): Observable<any> {
    if (Array.isArray(_PARAMETERS)) {
      for (const param of _PARAMETERS) {
        _ENDPOINT += '/' + param;
      }
    } else {
      let flag = true;
      for (const property in _PARAMETERS) {
        if (_PARAMETERS.hasOwnProperty(property)) {
          _ENDPOINT += ((flag === false) ? '&' : '?');
          _ENDPOINT += property + '=' + _PARAMETERS[property];
          flag = false;
        }
      }
    }
    return this.http.get<any>(
      this.config.apiUrl + _ENDPOINT,
      this.getOptions()
    ).pipe(catchError(this.handleError));
  }

  private POST(_ENDPOINT: string, _PAYLOAD: any): Observable<any> {
    if ('URL_PARAM' in _PAYLOAD) {
      for (const param of _PAYLOAD.URL_PARAM) {
        _ENDPOINT += '/' + param;
      }
      delete _PAYLOAD['URL_PARAM'];
    }
    if ('URL_KEY' in _PAYLOAD) {
      let flag = true;
      for (const param of _PAYLOAD.URL_KEY) {
        _ENDPOINT += ((flag === false) ? '&' : '?');
        _ENDPOINT += param[0] + '=' + param[1];
        flag = false;
      }
      delete _PAYLOAD['URL_KEY'];
    }
    if ('body' in _PAYLOAD) {
      _PAYLOAD = _PAYLOAD.body;
    }
    return this.http.post<any>(
      this.config.apiUrl + _ENDPOINT,
      _PAYLOAD,
      this.getOptions()
    ).pipe(catchError(this.handleError));
  }

  private PUT(_ENDPOINT: string, _PAYLOAD: any): Observable<any> {
    return this.http.put<any>(
      this.config.apiUrl + _ENDPOINT,
      _PAYLOAD,
      this.getOptions()
    ).pipe(catchError(this.handleError));
  }

  private DELETE(_ENDPOINT: string, _PARAMETERS: any): Observable<any> {
    if (_PARAMETERS) {
      for (const param of _PARAMETERS) {
        _ENDPOINT += '/' + param;
      }
    }
    return this.http.delete<any>(
      this.config.apiUrl + _ENDPOINT,
      this.getOptions()
    ).pipe(catchError(this.handleError));
  }
}
