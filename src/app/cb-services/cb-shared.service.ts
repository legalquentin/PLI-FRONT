import { Injectable, OnInit } from '@angular/core';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbApiService } from './cb-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CbSharedService implements OnInit {

  public EXCHANGES = [];
  public ACCOUNTS = [];
  public CURRENT_ACCOUNT = {};
  private _CURRENT_VOLUMES = new BehaviorSubject<any>(null);
  public CURRENT_VOLUMES = this._CURRENT_VOLUMES.asObservable();

  private _VOLUMES_HISTORY = new BehaviorSubject<any>(null);
  public VOLUMES_HISTORY = this._VOLUMES_HISTORY.asObservable();

  public VOLUMES_LOADED = false;

  constructor(
    private _CbApiService: CbApiService
  ) {}

  ngOnInit() { }

  init() {
    this.getAccounts(() => {
      if (this.ACCOUNTS.length > 0) {
        this.CURRENT_ACCOUNT = 0;
      }
      this.getAccount(() => {});
      this.getHistory(() => {});
    });
  }

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

  getAccount(callback): any {
    const flags = [];
    const volumes = {};

    if (this.CURRENT_ACCOUNT === 0) {
      // load all accounts
      for (const account of this.ACCOUNTS) {
        this.getAccountValues(account['id'], (err, result) => {
          if (!err) {
            const values = Object.keys(result['SubAccounts']).filter(
              key => result['SubAccounts'][key].Amount !== 0);
            for (const v of values) {
              if (!(v in volumes)) {
                volumes[v] = result.SubAccounts[v];
              } else {
                volumes[v]['Amount'] += result.SubAccounts[v]['Amount'];
              }
            }
            for (const v of values) {
              flags.push(true);
              this.getCryptosCurrentValues(volumes[v], () => {
                flags.pop();
                if (flags.length === 0) {
                  this.VOLUMES_LOADED = true;
                  this.changeVolumes(volumes);
                  callback(null);
                }
              });
            }
          }
        });
      }
    } else {
      // load single on based on id
      console.log('HERE', this.CURRENT_ACCOUNT);
      this.getAccountValues(this.CURRENT_ACCOUNT['id'], (err, result) => {
        if (!err) {
          const values = Object.keys(result['SubAccounts']).filter(
            key => result['SubAccounts'][key].Amount !== 0);
          for (const v of values) {
            volumes[v] = result.SubAccounts[v];
            flags.push(true);
            this.getCryptosCurrentValues(volumes[v], () => {
              flags.pop();
              if (flags.length === 0) {
                this.VOLUMES_LOADED = true;
                this.changeVolumes(volumes);
                callback(null);
              }
            });
          }
        }
      });
    }
  }

  changeVolumes(volume) {
    console.log(volume);
    this._CURRENT_VOLUMES.next(volume);
  }

  changeHistory(history) {
    console.log(history);
    this._VOLUMES_HISTORY.next(history);
  }

  getAccountValues(accountId: number, callback) {
    this._CbApiService.genericRequest(
      CbConstants.REQUESTS.GET_CURRENCIES, [accountId]).subscribe(result => {
        callback(null, result.data);
      }, error => {
        callback(error, null);
      });
  }

  getCryptosCurrentValues(crypto: any, callback) {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_VOLUME_VALUE, {
      amount: crypto['Amount'],
      crypto: crypto['Currency']['Symbol']
    }).subscribe(value => {
      crypto['Value'] = value;
      callback();
    });
  }

  getHistory(callback) {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_HISTORY, [12]).subscribe(result => {
      if (result.data && result.data.length > 0) {
        const data = result.data;
        const formated = [];
        let flag = false;
        for (const row of data) {
          const cryptos = JSON.parse(row.account_registry);
          const values = Object.keys(cryptos.SubAccounts).filter(
            key => cryptos.SubAccounts[key].Amount !== 0);
          if (!flag) {
            for (const val of values) {
              formated.push({
                name: val,
                series: []
              });
              // cryptos.SubAccounts[val];
            }
            flag = true;
          } else {
            for (const val of values) {
              const idx = formated.findIndex(p => p.name === val);
              const serie = {
                name: row.register_time,
                value: cryptos.SubAccounts[val].Value.EUR
              };
              // formated[idx].series.push(cryptos.SubAccounts[val]);
              formated[idx].series.push(serie);
            }
          }
        }
        this.changeHistory(formated);
      }
      console.log(result);
    });
  }
}
