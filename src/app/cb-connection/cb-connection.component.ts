import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { fadeAnimation, doAnimation } from '../cb-shared/animations';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbStorageService } from '../cb-services/cb-storage.service';

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
      state: 'inactive',
      flag: false
    },
    login: {
      state: 'inactive',
      flag: false
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
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService
  ) { }

  ngOnInit() {
    this.register = false;
    this.changeButton = this.translation.translate('CONNECTION.REGISTER.BUTTON');
  }

  selectLocale(language: string, country: string, currency: string): void {
    if (this.anim.language.flag === true) {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
      return;
    }
    this.anim.language.flag = true;
    doAnimation(400, this.anim.language, () => {
      this.anim.language.flag = false;
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
    });
  }

  changeForm() {
    if (this.anim.login.flag === true) {
      return;
    }
    this.anim.login.flag = true;
    doAnimation(400, this.anim.login, () => {
      this.anim.login.flag = false;
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
    if (PAYLOAD.login === '' || PAYLOAD.email === '' || PAYLOAD.password === '') {
      this.displayError('EMPTY_FIELD');
    } else {
      this._CbApiService.genericRequest(CbConstants.REQUESTS.REGISTER, PAYLOAD).subscribe(result => {
        console.log('RESPONSE', result);
        this._CbStorageService.createSession(result.data, () => {
          this.router.navigate(['cryptobo4rd/dashboard']);
        });
      }, err => {
        console.log('ERROR', err);
        this.displayError(err.error.message);
      });
    }
  }

  doLogin() {
    const PAYLOAD = {
      login: this.LOGIN.IDENTIFIER,
      password: this.LOGIN.PASSWORD,
    };
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LOGIN, PAYLOAD).subscribe(result => {
      console.log('SUCCESS', result);
      this._CbStorageService.createSession(result.data, () => {
        this.router.navigate(['cryptobo4rd/dashboard']);
      });
    }, err => {
      console.log('ERROR', err);
      this.displayError(err.error.message);
    });
  }

  displayError(message) {
    this.ERROR_MESSAGE = this.translation.translate('CONNECTION.ERROR.' + message);
    setTimeout(() => {
      this.ERROR_MESSAGE = '';
    }, 2000);
  }
}
