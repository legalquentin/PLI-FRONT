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

  createSession(sessionObject: any) {
    sessionStorage.setItem(CbConstants.SESSION_KEY, JSON.stringify(sessionObject));
    this.loadSession();
  }

  updateSessionData(sessionObject: any): void {
    this.session = sessionObject;
    sessionStorage.setItem(CbConstants.SESSION_KEY, JSON.stringify(sessionObject));
  }

  clearSession(): void {
    sessionStorage.removeItem(CbConstants.SESSION_KEY);
    this.session = null;
  }

  isAuthenticated(): boolean {
    return (this.getSessionToken() !== '');
  }

  updateSessionUserData(user) {
    this.session['USER'] = Object.assign(this.session['USER'], user);
    this.updateSessionData(this.session);
  }

  updateSessionAccountsData(ACCOUNTS: any[]): any {
    this.session['ACCOUNTS'] = ACCOUNTS;
    this.updateSessionData(this.session);
  }

  firstConnection(): any {
    if (this.session['FIRST']) {
      this.session['FIRST'] = false;
      this.updateSessionData(this.session);
      return true;
    }
    return false;
  }

  // USER METHODS

  getUserEmail(): string {
    let email = '';
    if (this.session && this.session['USER'] && this.session['USER']['email']) {
      email = this.session['USER']['email'];
    }
    return email;
  }

  getUserFirstName(): string {
    let userFirstName = '';
    if (this.session && this.session['USER'] && this.session['USER']['firstname']) {
      userFirstName = this.session['USER']['firstname'];
    }
    return userFirstName;
  }

  getUserLastName(): string {
    let userLastName = '';
    if (this.session && this.session['USER'] && this.session['USER']['lastname']) {
      userLastName = this.session['USER']['lastname'];
    }
    return userLastName;
  }

  getUserLogin(): string {
    let userLastName = '';
    if (this.session && this.session['USER'] && this.session['USER']['login']) {
      userLastName = this.session['USER']['login'];
    }
    return userLastName;
  }

  getUserFullName(): string {
    let userFullName = this.getUserEmail();
    const lname = this.getUserLastName();
    const fname = this.getUserFirstName();

    if (lname !== '' || fname !== '') {
      userFullName = fname + ' ' + lname;
    }
    return userFullName;
  }

  getUserVisibility(): number {
    let userVisibility = 0;
    if (this.session && this.session['USER'] && this.session['USER']['public']) {
      userVisibility = this.session['USER']['public'];
    }
    return userVisibility;
  }

  getUserBlock(): boolean {
    let userBlock = false;
    if (this.session && this.session['USER'] && this.session['USER']['blockMessages']) {
      userBlock = this.session['USER']['blockMessages'];
    }
    return userBlock;
  }

  getUserStatusMessage(): string {
    let statusMessage = '';
    if (this.session && this.session['USER'] && this.session['USER']['statusMessage']) {
      statusMessage = this.session['USER']['statusMessage'];
    }
    return statusMessage;
  }

  // ACCOUNTS METHODS

  getAccounts(): any[] {
    let accounts = [];
    if (this.session && this.session['ACCOUNTS']) {
      accounts = this.session['ACCOUNTS'];
    }
    return accounts;
  }

  getSessionToken(): string {
    let sessionToken = '';
    if (this.session && this.session['SESSION_TOKEN']) {
      sessionToken = this.session['SESSION_TOKEN'];
    }
    return sessionToken;
  }
}
