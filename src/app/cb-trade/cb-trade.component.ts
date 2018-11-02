import { Component, OnInit } from '@angular/core';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-trade',
  templateUrl: './cb-trade.component.html',
  styleUrls: ['./cb-trade.component.css']
})
export class CbTradeComponent implements OnInit {

  public availablePair = [];
  public dump: any;

  constructor(
    private _CbApiService: CbApiService
  ) {}

  ngOnInit() {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_MARKET_INFO, ['binance']).subscribe( result => {
      console.log('GET_MARKET_INFO SUCCESS', result);
      this.dump = JSON.stringify(result);
    }, err => {
      console.error(err);
    });
    this.availablePair.push({
      value: 'test'
    });
    this.availablePair.push({
      value: 'hello'
    });
  }

  do(arg) {
    console.log(arg);
  }
}
