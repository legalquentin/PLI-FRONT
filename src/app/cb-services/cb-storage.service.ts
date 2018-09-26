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
    console.log('Session loaded', this.session);
  }

  createSession(sessionObject: any, callback) {
    sessionStorage.setItem(CbConstants.SESSION_KEY, JSON.stringify(sessionObject));
    this.loadSession();
    callback();
  }

  clearSession() {
    sessionStorage.removeItem(CbConstants.SESSION_KEY);
    this.session = null;
  }

  isAuthenticated(): boolean {
    return (this.session !== null);
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
    if (this.session && this.session['token']) {
      sessionToken = this.session['token'];
    }
    return sessionToken;
  }
}
