import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { fadeAnimation, doAnimation } from '../cb-shared/cb-animations';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbEventService } from '../cb-services/cb-event.service';
import { CbLocaleService } from '../cb-services/cb-locale.service';

interface REGISTER {
  LOGIN: string;
  MAIL: string;
  PASSWORD: string;
  REPEAT_PASSWORD: string;
}

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
  public loading = false;
  public anim = {
    language: false,
    login: false
  };

  public REGISTER: REGISTER;

  public LOGIN = {
    IDENTIFIER: '',
    PASSWORD: ''
  };

  public ERROR_MESSAGE = '';

  private USER_OBJECT = {
    USER: {},
    SESSION_TOKEN: '',
    FIRST: false
  };

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService,
    private _CbLocaleService: CbLocaleService,
    public _CbEventService: CbEventService
  ) { }

  ngOnInit() {
    this.register = false;
    this.changeButton = this.translation.translate('CONNECTION.REGISTER.BUTTON');
  }

  selectLocale(language: string, country: string, currency: string): void {
    if (this.anim.language === true) {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
      return;
    }
    this.anim.language = true;
    this._CbEventService.broadcast('language');
    doAnimation(400, this._CbEventService.ANIMATIONS.language, () => {
      this.anim.language = false;
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
    });
  }

  changeForm() {
    if (this.anim.login === true) {
      return;
    }
    this.anim.login = true;
    this._CbEventService.broadcast('login');
    doAnimation(400, this._CbEventService.ANIMATIONS.login, () => {
      this.anim.login = false;
      this.register = !this.register;
      this.changeButton = this.translation.translate(
        (this.register) ? 'CONNECTION.LOGIN.BUTTON' : 'CONNECTION.REGISTER.BUTTON'
      );
    });
  }

  doRegister() {
    this.loading = true;
    const PAYLOAD = {
      login: this.REGISTER.LOGIN,
      email: this.REGISTER.MAIL,
      password: this.REGISTER.PASSWORD
    };
    if (PAYLOAD.login === '' || PAYLOAD.email === '' || PAYLOAD.password === '') {
      this.displayError('EMPTY_FIELD');
      this.loading = false;
    } else {
      this._CbApiService.genericRequest(CbConstants.REQUESTS.REGISTER, PAYLOAD).subscribe(result => {
        console.log('REGISTER_SUCCESS', result);
        this.USER_OBJECT.SESSION_TOKEN = result.data.token;
        this._CbStorageService.createSession(this.USER_OBJECT, () => {
          this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_PROFILE).subscribe(res => {
            if (res.data) {
              console.log('PROFILE_SUCCESS', res);
              this.USER_OBJECT.USER = res.data;
              this.USER_OBJECT.FIRST = true;
              this._CbStorageService.updateSessionData(this.USER_OBJECT, () => {
                this.router.navigate(['cryptobo4rd/dashboard']);
              });
            } else {
              console.log('PROFILE_ERROR', res);
              this.loading = false;
              this.displayError('invalid response');
              this._CbStorageService.clearSession();
            }
          }, err => {
            console.log('PROFILE_ERROR', err);
            this.loading = false;
            this.displayError(err.error.message);
            this._CbStorageService.clearSession();
          });
        });
      }, err => {
        console.log('ERROR', err);
        this.loading = false;
        this.displayError(err.error.message);
      });
    }
  }

  doLogin() {
    this.loading = true;
    const PAYLOAD = {
      login: this.LOGIN.IDENTIFIER,
      password: this.LOGIN.PASSWORD,
    };
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LOGIN, PAYLOAD).subscribe(result => {
      console.log('LOGIN_SUCCESS', result);
      this.USER_OBJECT.SESSION_TOKEN = result.data.token;
      this._CbStorageService.createSession(this.USER_OBJECT, () => {
        this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_PROFILE).subscribe(res => {
          if (res.data) {
            console.log('PROFILE_SUCCESS', res);
            this.USER_OBJECT.USER = res.data;
            this._CbStorageService.updateSessionData(this.USER_OBJECT, () => {
              this.router.navigate(['cryptobo4rd/dashboard']);
            });
          } else {
            console.log('PROFILE_ERROR', res);
            this.displayError('invalid response');
            this.loading = false;
            this._CbStorageService.clearSession();
          }
        }, err => {
          console.log('PROFILE_ERROR', err);
          this.loading = false;
          this.displayError(err.error.message);
          this._CbStorageService.clearSession();
        });
      });
    }, err => {
      console.log('LOGIN_ERROR', err);
      this.loading = false;
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
