import { Injectable } from '@angular/core';
import { TranslationService, LocaleService } from 'angular-l10n';
import { CbApiService } from './cb-api.service';
import { CbEventService } from './cb-event.service';
import { doAnimation } from '../cb-shared/cb-animations';

@Injectable({
  providedIn: 'root'
})
export class CbLocaleService {

  constructor(
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
    private _CbEventService: CbEventService
  ) { }

  selectLocale(language: string, country: string, currency: string, animate: boolean = false) {
    // if (animate)
    this._CbEventService.broadcast('language');
    doAnimation(300, this._CbEventService.ANIMATIONS.language, () => {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
    });
  }
}
