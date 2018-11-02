import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbEventService } from '../cb-services/cb-event.service';
import { CbLocaleService } from '../cb-services/cb-locale.service';

@Component({
  selector: 'app-cb-account',
  templateUrl: './cb-account.component.html',
  styleUrls: ['./cb-account.component.css']
})
export class CbAccountComponent implements OnInit {
  @Language() lang: string;

  public ACCOUNT = {
    PUBLIC: 0,
    BLOCK: false,
    EMAIL: '',
    FIRSTNAME: '',
    LASTNAME: '',
    LOGIN: '',
    DESCRIPTION: ''
  };

  public ERROR_MESSAGE = '';

  constructor(
    private localeService: LocaleService,
    private router: Router,
    private translationService: TranslationService,
    private _CbStorageService: CbStorageService,
    private _CbApiService: CbApiService,
    public _CbEventService: CbEventService,
    private _CbLocaleService: CbLocaleService
  ) {
    this.buildAccount();
  }

  ngOnInit() {}

  buildAccount(): void {
    this.ACCOUNT.EMAIL = this._CbStorageService.getUserEmail();
    this.ACCOUNT.LOGIN = this._CbStorageService.getUserLogin();
    this.ACCOUNT.LASTNAME = this._CbStorageService.getUserLastName();
    this.ACCOUNT.FIRSTNAME = this._CbStorageService.getUserFirstName();
    this.ACCOUNT.BLOCK = this._CbStorageService.getUserBlock();
    this.ACCOUNT.PUBLIC = this._CbStorageService.getUserVisibility();
    this.ACCOUNT.DESCRIPTION = this._CbStorageService.getUserStatusMessage();
    console.log('[this.ACCOUNT]', this.ACCOUNT);
  }

  setAccountVisibility(value: number): void {
    this.ACCOUNT.PUBLIC = value;
  }

  setAccountBlock(block: boolean): void {
    this.ACCOUNT.BLOCK = block;
  }

  cancel(): void {
    this.buildAccount();
  }

  save(): void {
    this.validatePayload((err, payload) => {
      if (err !== null) {
        console.error('invalid payload');
      } else {
        this._CbEventService.LOADING = true;
        this._CbApiService.genericRequest(CbConstants.REQUESTS.UPDATE_PROFILE, payload).subscribe(result => {
          this._CbStorageService.updateSessionUserData(payload);
          console.log('UPDATE_PROFILE SUCCESS', result);
          this._CbEventService.LOADING = false;
        }, error => {
          console.log('UPDATE_PROFILE ERROR', error);
          this._CbEventService.LOADING = false;
        });
      }
    });
  }

  validatePayload(callback) {
    try {
      const payload = {
        // id: 0,
        lastname: this.ACCOUNT.LASTNAME,
        firstname: this.ACCOUNT.FIRSTNAME,
        public: this.ACCOUNT.PUBLIC,
        statusMessage: this.ACCOUNT.DESCRIPTION,
        avatarUrl: '',
        // online: 0,
        blockMessages: this.ACCOUNT.BLOCK,
        region: {
          // id: 0,
          keyLang: this.localeService.getCurrentLocale(),
          devise: this.localeService.getCurrentCurrency(),
          country: this.localeService.getCurrentCountry()
        },
        // settings: {
        //   id: 0,
        //   rememberMe: 0,
        //   newsletter: 0
        // }
      };
      callback(null, payload);
    } catch (e) {
      callback(e, null);
    }
  }

  displayError(message) {
    this.ERROR_MESSAGE = this.translationService.translate('ACCOUNT.ERROR.' + message);
    setTimeout(() => {
      this.ERROR_MESSAGE = '';
    }, 2000);
  }

  selectLocale(language: string, country: string, currency: string) {
    this._CbLocaleService.selectLocale(language, country, currency, true);
  }
}
