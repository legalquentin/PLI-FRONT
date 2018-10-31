import { Component, OnInit } from '@angular/core';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-transaction',
  templateUrl: './cb-transaction.component.html',
  styleUrls: ['./cb-transaction.component.css']
})
export class CbTransactionComponent implements OnInit {

  public AVAILABLE_CURRENCIES = [];

  constructor(
    private _cbApiService: CbApiService
  ) {

  }

  ngOnInit() {
    this._cbApiService.genericRequest(CbConstants.REQUESTS.GET_PAIR, ['BINANCE']).subscribe(result => {
      console.log('GET_PAIR', result);
    }, error => {
      console.error('GET_PAIR', error);
    });
    this._cbApiService.genericRequest(CbConstants.REQUESTS.GET_MARKET_INFO, ['BINANCE']).subscribe(result => {
      console.log('GET_MARKET_INFO', result);
    }, error => {
      console.error('GET_MARKET_INFO', error);
    });
    this._cbApiService.genericRequest(CbConstants.REQUESTS.GET_VOLUME_VALUE, {
      amount: 1,
      crypto: 'BTC'
    }).subscribe(result => {
      console.log('GET_VOLUME_VALUE', result);
    }, error => {
      console.error('GET_VOLUME_VALUE', error);
    });
  }

}
