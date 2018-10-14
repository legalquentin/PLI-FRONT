import { Component, OnInit } from '@angular/core';
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

  public EXCHANGES: Array<any>;
  constructor(
    private translate: TranslationService,
    private _CbApiService: CbApiService
  ) {
    this.loadExchanges();
  }

  ngOnInit() {
  }

  loadExchanges(): void {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_PROVIDERS).subscribe(result => {
      this.EXCHANGES = result.data;
    }, error => {
      console.error('Failed to LIST_PROVIDERS', error);
    });
  }

  createAccount(exchange: string) {
    console.log('CREATING ACCOUNT ON ' + exchange);
  }
}
