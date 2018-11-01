import { Component, OnInit, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbApiService } from '../cb-services/cb-api.service';
import { TranslationService, LocaleService, Language } from 'angular-l10n';

@Component({
  selector: 'app-cb-trade',
  templateUrl: './cb-trade.component.html',
  styleUrls: ['./cb-trade.component.css']
})
export class CbTradeComponent implements OnInit {

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
  ) { }

  @ViewChild('exchangeCard')
  exchangeCard: TemplateRef<any>;
  @Language()
  lang: string;

  public CRYPTOAVALABLES = [];

  public CARDEXCHANGES = [];

  public VIEW_TAB2 = false;
  public VIEW_TAB3 = false;
  public SAVE_PAIR = '';

  ngOnInit() {
    this.VIEW_TAB2 = false;
    this.CARDEXCHANGES.push({
      title: 'kraken',
      crypto: 'bitcoin',
      paire: 'kraken/bitcoin'
    });
    this.CARDEXCHANGES.push({
      title: 'kraken',
      crypto: 'bitcoin',
      paire: 'kraken/bitcoin'
    });
    this.CRYPTOAVALABLES = [];
  }

  preselect(params): any {

  }

  getPair(params): any {
    const url = CbConstants.REQUESTS.GET_PAIR;
    if (this.SAVE_PAIR === '') {
      this.SAVE_PAIR = url.PATH;
    } else {
      url.PATH = this.SAVE_PAIR;
    }
    url.PATH += '/' + params;
    this._CbApiService
      .genericRequest(url)
      .subscribe(
        result => {
          this.CRYPTOAVALABLES = result;
          console.log('ADD_PROVIDERS on ' + params + ' SUCCESS', result);
        },
        error => {
          console.error('Failed to ADD_PROVIDERS', error);
        }
      );
  }


}

