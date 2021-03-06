import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { fadeAnimation, doAnimation } from '../cb-shared/cb-animations';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbEventService } from '../cb-services/cb-event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidSelection } from '../cb-shared/cb-match-form';
import { CbSharedService } from '../cb-services/cb-shared.service';

declare let $: any;

@Component({
  selector: 'app-cb-connection',
  templateUrl: './cb-connection.component.html',
  styleUrls: ['./cb-connection.component.css'],
  animations: [fadeAnimation(300)]
})
export class CbConnectionComponent implements OnInit {
  @Language()
  lang: string;

  public action = false;
  public register: boolean;
  public changeButton: string;
  public loading = false;
  public anim = {
    language: false,
    login: false
  };

  public ERROR_MESSAGE = '';

  private SESSION = {
    SESSION_TOKEN: '',
    USER: '',
    FIRST: false,
    ACCOUNTS: []
  };

  public loginFormGroup = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('.{3,20}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('.{3,20}$')
    ])
  });

  public matcher = new ValidSelection();
  public registerFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('.{3,20}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('.{3,20}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('.{3,20}$'),
    ])
  }, [ this.checkPasswords ]);

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService,
    private _CbSharedService: CbSharedService,
    public _CbEventService: CbEventService,
  ) {}

  ngOnInit() {
    this.register = false;
    this.changeButton = this.translation.translate(
      'CONNECTION.REGISTER.BUTTON'
    );
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
        this.register ? 'CONNECTION.LOGIN.BUTTON' : 'CONNECTION.REGISTER.BUTTON'
      );
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;

    return pass === confirmPassword ? null : { notSame: true };
  }

  // HTTP REQUESTS

  // REGISTER PROCEDURE
  doRegister(): void {
    this.registerFormGroup.disable();
    this.loading = true;
    const PATH = CbConstants.REQUESTS;
    const PAYLOAD = {
      email: this.registerFormGroup.get('email').value,
      login: this.registerFormGroup.get('login').value,
      password: this.registerFormGroup.get('password').value,
    };
    if (PAYLOAD) {
      const _sub = this._CbApiService.genericRequest(PATH.REGISTER, PAYLOAD);
      _sub.subscribe(result =>
          this.getProfile(result.data, (ok) => {
            if (ok) {
              this.SESSION.FIRST = true;
              this._CbStorageService.updateSessionData(this.SESSION);
              this.router.navigate(['cryptobo4rd/dashboard']);
            }
          }),
        error => this.displayError(error)
      );
    } else {
      this.displayError('EMPTY_FIELD');
    }
  }

  // LOGIN PROCEDURE
  doLogin(): void {
    this.loginFormGroup.disable();
    this.loading = true;
    const PATH = CbConstants.REQUESTS;
    const PAYLOAD = {
      login: this.loginFormGroup.get('login').value,
      password: this.loginFormGroup.get('password').value,
    };
    const _subLogin = this._CbApiService.genericRequest(PATH.LOGIN, PAYLOAD);

    _subLogin.subscribe(
      result => {
        this.getProfile(result.data, (ok) => {
          if (ok) {
            this._CbSharedService.getProviders((err, accounts) => {
              if (err) {
                this.displayError(err, true);
              } else {
                this.SESSION.ACCOUNTS = accounts;
                this._CbStorageService.updateSessionData(this.SESSION);
                this.router.navigate(['cryptobo4rd/dashboard']);
              }
            });
          } else {
            this.displayError('ERROR', true);
          }
        });
      },
      err => this.displayError(err, true)
    );
  }

  // RECOVER USER DATA
  getProfile(data: any, callback) {
    const PATH = CbConstants.REQUESTS;
    this.SESSION.SESSION_TOKEN = data.token;
    this._CbStorageService.createSession(this.SESSION);
    const _subUser = this._CbApiService.genericRequest(PATH.GET_PROFILE);

    _subUser.subscribe(
      result => {
        if (result.data) {
          this.SESSION.USER = result.data;
          this._CbStorageService.updateSessionData(this.SESSION);
          callback(true);
        } else {
          this.displayError('INVALID_RESP', true);
          callback(false);
        }
      },
      err => {
        this.displayError(err, true);
        callback(false);
      }
    );
  }

  // DISPLAY ERROR, STOP LOADING, AND CAN CLEAR SESSION
  displayError(msg, clear: boolean = false) {
    this.loading = false;
    this.registerFormGroup.enable();
    this.loginFormGroup.enable();
    this.ERROR_MESSAGE = this.translation.translate('CONNECTION.ERROR.' + msg);
    if (clear) {
      this._CbStorageService.clearSession();
    }
    setTimeout(() => {
      this.ERROR_MESSAGE = '';
    }, 3500);
  }

  inputChange(data, form: string) {
    console.log(data.target.value);
    this.loginFormGroup.get(form).setValue(data.target.value);
  }
}
