import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService, Language } from 'angular-l10n';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbEventService } from '../cb-services/cb-event.service';
import { doAnimation } from '../cb-shared/cb-animations';

@Component({
  selector: 'app-cb-settings',
  templateUrl: './cb-settings.component.html',
  styleUrls: ['./cb-settings.component.css']
})
export class CbSettingsComponent implements OnInit {
  @Language() lang: string;

  public EXCHANGES = {
    ACCOUNTS: [
      {
        logo: '/src/assets/exchanges/logos/logo_binance.png',
        key: 12345,
        label: 'Binance',
        access: 'read',
        status: 1,
      },
      {
        logo: '/src/assets/exchanges/logos/logo_bittrex.png',
        key: 42335,
        label: 'Bittrex',
        access: 'read/write',
        status: 1
      },
      {
        logo: '/src/assets/exchanges/logos/logo_kraken.png',
        key: 905,
        label: 'Kraken',
        access: 'read/write',
        status: 0
      },
    ]
  };

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
    private _CbEventService: CbEventService
  ) {}

  ngOnInit() {
  }

  loadExchangeSettings(): void {
  }

  selectLocale(language: string, country: string, currency: string) {
    this._CbEventService.broadcast('language');
    doAnimation(300, this._CbEventService.ANIMATIONS.language, () => {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
    });
  }
}
