import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

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
    private _CbApiService: CbApiService
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
        this._CbApiService.genericRequest(CbConstants.REQUESTS.UPDATE_PROFILE, payload).subscribe(result => {
          this._CbStorageService.updateSessionUserData(payload);
          console.log('UPDATE_PROFILE SUCCESS', result);
        }, error => {
          console.log('UPDATE_PROFILE ERROR', error);
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
}