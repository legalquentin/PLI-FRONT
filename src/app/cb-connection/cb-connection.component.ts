import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { fadeAnimation, doAnimation } from '../cb-shared/animations';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-connection',
  templateUrl: './cb-connection.component.html',
  styleUrls: ['./cb-connection.component.css'],
  animations: [
    fadeAnimation(300)
  ]
})
export class CbConnectionComponent implements OnInit {
  @Language() lang: string;

  public action = false;
  public register: boolean;
  public changeButton: string;
  public anim = {
    language: {
      state: 'inactive'
    },
    login: {
      state: 'inactive'
    }
  };

  public REGISTER = {
    LOGIN: '',
    MAIL: '',
    PASSWORD: '',
    REPEAT_PASSWORD: ''
  };

  public LOGIN = {
    IDENTIFIER: '',
    PASSWORD: ''
  };

  public ERROR_MESSAGE = '';

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService
  ) { }

  ngOnInit() {
    this.register = false;
    this.changeButton = this.translation.translate('CONNECTION.REGISTER.BUTTON');
  }

  selectLocale(language: string, country: string, currency: string): void {
    doAnimation(300, this.anim.language, () => {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
    });
  }

  changeForm() {
    doAnimation(400, this.anim.login, () => {
      this.register = !this.register;
      this.changeButton = this.translation.translate(
        (this.register) ? 'CONNECTION.LOGIN.BUTTON' : 'CONNECTION.REGISTER.BUTTON'
      );
    });
  }

  doRegister() {
    const PAYLOAD = {
      login: this.REGISTER.LOGIN,
      email: this.REGISTER.MAIL,
      password: this.REGISTER.PASSWORD
    };
    this._CbApiService.genericRequest(CbConstants.REQUESTS.REGISTER, PAYLOAD).subscribe(result => {
      console.log('RESPONSE', result.status);
      this.router.navigate(['cryptobo4rd/dashboard']);
    }, err => {
      console.log('ERROR', err);
      this.displayError(err.error.message);
    });
  }

  doLogin() {
    const PAYLOAD = {
      login: this.LOGIN.IDENTIFIER,
      password: this.LOGIN.PASSWORD,
    };
    this._CbApiService.genericRequest(CbConstants.REQUESTS.REQUEST_LOGIN, PAYLOAD).subscribe(result => {
      console.log('SUCCESS', result.status);
      this.router.navigate(['cryptobo4rd/dashboard']);
    }, err => {
      console.log('ERROR', err);
      this.displayError(err.error.message);
    });
  }

  displayError(message) {
    this.ERROR_MESSAGE = message;
    setTimeout(() => {
      this.ERROR_MESSAGE = '';
    }, 1000);
  }
}
