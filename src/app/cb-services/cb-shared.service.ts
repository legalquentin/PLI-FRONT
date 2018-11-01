import { Injectable } from '@angular/core';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbApiService } from './cb-api.service';

@Injectable({
  providedIn: 'root'
})
export class CbSharedService {

  public EXCHANGES = [];
  public ACCOUNTS = [];

  constructor(
    private _CbApiService: CbApiService
  ) { }

  getProviders(callback) {
    const PATH = CbConstants.REQUESTS;
    const _subPrv = this._CbApiService.genericRequest(PATH.LIST_PROVIDERS);

    _subPrv.subscribe(
      result => {
        this.EXCHANGES = result.data;
        callback(null, this.EXCHANGES);
      },
      err => callback(err, null)
    );
  }

  // RECOVER USER PROVIDERS
  getAccounts(callback) {
    this.getProviders((err, exchanges) => {
      if (err) {
        callback(err, null);
      } else {
        const accounts = [];
        for (const exchange of exchanges) {
          for (const account of exchange.accounts) {
            account.exchange = exchange.name;
            accounts.push(account);
          }
        }
        this.ACCOUNTS = accounts;
        callback(null, accounts);
      }
    });
  }
}
