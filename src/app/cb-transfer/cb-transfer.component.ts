import { Component, OnInit } from '@angular/core';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-transfer',
  templateUrl: './cb-transfer.component.html',
  styleUrls: ['./cb-transfer.component.css']
})
export class CbTransferComponent implements OnInit {

  public AVAILABLE_CURRENCIES = [];

  constructor(
    private _cbApiService: CbApiService
  ) {

  }

  ngOnInit() {
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
