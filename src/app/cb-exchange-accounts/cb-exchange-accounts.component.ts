import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-exchange-accounts',
  templateUrl: './cb-exchange-accounts.component.html',
  styleUrls: ['./cb-exchange-accounts.component.css']
})
export class CbExchangeAccountsComponent implements OnInit {
  @Language() lang: string;
  @ViewChild('textTemplate') textTemplate: TemplateRef<any>;
  @ViewChild('buttonTemplate') buttonTemplate: TemplateRef<any>;
  @ViewChild('sliderTemplate') sliderTemplate: TemplateRef<any>;
  @ViewChild('iconButtonTemplate') iconButtonTemplate: TemplateRef<any>;

  public EXCHANGES: Array<any>;
  public ACCOUNTS = {
    columns: [],
    data: []
  };
  public publicKey: string;
  public privateKey: string;
  public LOADED = false;

  constructor(
    private translate: TranslationService,
    private _CbApiService: CbApiService
  ) {
    this.loadExchanges();
    this.publicKey = '';
    this.privateKey = '';
  }

  ngOnInit() {
  }

  loadExchanges(): void {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_PROVIDERS).subscribe(result => {
      console.log(result);
      this.EXCHANGES = result.data;
      this.ACCOUNTS.columns.push({KEY: 'EXCHANGE', VIEW: this.textTemplate });
      this.ACCOUNTS.columns.push({KEY: 'SLIDER', VIEW: this.sliderTemplate });
      this.ACCOUNTS.columns.push({KEY: 'DATE', VIEW: this.textTemplate });
      this.ACCOUNTS.columns.push({KEY: 'DELETE', VIEW: this.iconButtonTemplate });
      for (const exchange of this.EXCHANGES) {
        if (typeof exchange.value === 'string') {
          this.ACCOUNTS.data.push({EXCHANGE: exchange.name, SLIDER: true, DATE: '15/10/2018', DELETE: null});
        }
      }
      this.LOADED = true;
      console.log(this.ACCOUNTS);
    }, error => {
      console.error('Failed to LIST_PROVIDERS', error);
    });
  }

  createAccount(exchange: string) {
    const payload = {
      URL_PARAM: [exchange],
      value: this.publicKey,
      sign: this.privateKey
    };
    this._CbApiService.genericRequest(CbConstants.REQUESTS.ADD_PROVIDERS, payload).subscribe(result => {
      console.log('ADD_PROVIDERS on ' + exchange + ' SUCCESS', result);
    }, error => {
      console.error('Failed to ADD_PROVIDERS', error);
    });
  }

  echo(row) {
    console.log(row);
  }

  delete(row) {
    console.log('DELETE', row);
  }
}
