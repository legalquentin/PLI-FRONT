import { Component, OnInit } from '@angular/core';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cb-trade',
  templateUrl: './cb-trade.component.html',
  styleUrls: ['./cb-trade.component.css']
})
export class CbTradeComponent implements OnInit {

  public availableCrypto = [];
  public TRADE_OPT = [
    'LIMIT_BUY',
    'LIMIT_SELL',
    'MARKET_BUY',
    'MARKET_SELL'
  ];

  public tradeFormGroup = new FormGroup({
    mode: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    key: new FormControl('', [
      Validators.required
    ]),
  });


  constructor(
    private _CbApiService: CbApiService
  ) {}

  ngOnInit() {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_CRYPTOS).subscribe( result => {
      console.log('GET_CRYPTOS SUCCESS', result);
    }, err => {
      console.error(err);
    });
    this.availableCrypto.push({
      value: 'test'
    });
    this.availableCrypto.push({
      value: 'hello'
    });
  }

  trade() {
    const params = {
      URL_PARAM: ['12'],
      URL_KEY: [['type', this.TRADE_OPT[this.tradeFormGroup.get('mode').value]]],
      body: {
        price: this.tradeFormGroup.get('price').value.toString(),
        amount: this.tradeFormGroup.get('amount').value.toString(),
        currency_pair: this.tradeFormGroup.get('key').value.toString()
      }
    };

    this._CbApiService.genericRequest(CbConstants.REQUESTS.PLACE_ORDER, params).subscribe(result => {
      console.log('PLACE_ORDER', result);
    }, error => {
      console.error(error);
    });
  }

}
