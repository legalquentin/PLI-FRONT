import { Injectable } from '@angular/core';
import { CbConstants } from '../cb-shared/cb-constants';

@Injectable({
  providedIn: 'root'
})
export class CbStorageService {

  private session: object;

  constructor() {
    this.loadSession();
  }

  loadSession(): void {
    this.session = JSON.parse(sessionStorage.getItem(CbConstants.SESSION_KEY));
  }

  createSession(sessionObject: any) {
    localStorage.setItem(CbConstants.SESSION_KEY, JSON.stringify(sessionObject));
    this.loadSession();
  }

  clearSession() {
    sessionStorage.removeItem(CbConstants.SESSION_KEY);
    this.session = null;
  }

  getUserEmail(): string {
    let email = '';
    if (this.session && this.session['USER'] && this.session['USER']['EMAIL']) {
      email = this.session['USER']['EMAIL'];
    }
    return email;
  }

  getUserFirstName() {
    let userFirstName = '';
    if (this.session && this.session['USER'] && this.session['USER']['FIRSTNAME']) {
      userFirstName = this.session['USER']['FIRSTNAME'];
    }
    return userFirstName;
  }

  getUserLastName() {
    let userLastName = '';
    if (this.session && this.session['USER'] && this.session['USER']['LASTNAME']) {
      userLastName = this.session['USER']['LASTNAME'];
    }
    return userLastName;
  }

  getSessionToken() {
    let sessionToken = '';
    if (this.session && this.session['SESSION_TOKEN']) {
      sessionToken = this.session['SESSION_TOKEN'];
    }
    return sessionToken;
  }
}
