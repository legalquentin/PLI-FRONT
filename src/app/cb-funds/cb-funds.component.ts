import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-funds',
  templateUrl: './cb-funds.component.html',
  styleUrls: ['./cb-funds.component.css']
})
export class CbFundsComponent implements OnInit {
  @Language() lang: string;

  public FUNDS: string;
  public PROVIDERS: string;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService
  ) { }

  ngOnInit() {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_CURRENCIES, ['KRAKEN']).subscribe(result => {
      this.FUNDS = JSON.stringify(result);
      console.log('GET_CURRENCIES SUCCESS', result);
    }, error => {
      console.log('GET_CURRENCIES ERROR', error);
    });
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_PROVIDERS).subscribe(result => {
      this.PROVIDERS = JSON.stringify(result);
      console.log('LIST_PROVIDERS SUCCESS', result);
    }, error => {
      console.log('LIST_PROVIDERS ERROR', error);
    });
  }

}
