import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { MatDialog } from '@angular/material';
import { CbKeysModalComponent } from '../cb-modals/cb-keys-modal/cb-keys-modal.component';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
// import { cryptowatch } from '../../../node_modules/cryptowatch-embed/src/main.js'
import CryptowatchEmbed from 'cryptowatch-embed';
declare var $: any;
@Component({
  selector: 'app-cb-dashboard',
  templateUrl: './cb-dashboard.component.html',
  styleUrls: ['./cb-dashboard.component.css']
})
export class CbDashboardComponent implements OnInit {
  @Language() lang: string;

  public chart: any;
  public PIE_CONFIG = {
    LOADED: false,
    DATA: []
  };
  public GRAPH_CONFIG = {
    LOADED: false,
    DATA: []
  };
  public TABLE_CONFIG = {};

  public ready = false;

  public ACCOUNTS = [];
  public ACTIVE_ACCOUNT = 0;
  public NO_EXCHANGE = true;
  public EMPTY = {
    HEADER: '<h3>' + this.translation.translate('MESSAGE.EMPTY.HEADER') + '</h3>',
    BODY: '<span>' + this.translation.translate('MESSAGE.EMPTY.BODY') + '<span>',
    FOOTER: ''
  };
  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private dialog: MatDialog,
    private _CbStorageService: CbStorageService,
    private _CbApiService: CbApiService
  ) { }

  ngOnInit() {
    // $('#navigate').click(this.navigate('exchange'));
    if (this._CbStorageService.firstConnection()) {
      this.firstConnection();
    } else {
      this.ACCOUNTS = this._CbStorageService.getAccounts();
      this.ACTIVE_ACCOUNT = this._CbStorageService.getActiveAccount();
      this.loadCurrencies();
      this.setUpDashboard();
      this.GRAPH_CONFIG = {
        LOADED: true,
        DATA: [
          {
            'name': 'BTC',
            'series': []
          },
        ​
          {
            'name': 'ETH',
            'series': []
          }
        ]
      };

      let year = 2010;

      for (let i = 0; i !== 50; i++) {
        this.GRAPH_CONFIG.DATA[0].series.push({
          'name': year + '/' + i % 12 + 1,
          'value': Math.random() * 50
        });
        this.GRAPH_CONFIG.DATA[1].series.push({
          'name': year + '/' + i % 12 + 1,
          'value': Math.random() * 50
        });
        if (i % 12 === 0) {
          year++;
        }
      }
      this.PIE_CONFIG = {
        LOADED: true,
        DATA: [
          {
            'name': 'BTC',
            'value': 89
          },
          {
            'name': 'ETH',
            'value': 500
          },
          {
            'name': 'TRN',
            'value': 20
          },
          {
            'name': 'OTHER',
            'value': 340
          },
        ]
      };
    }
  }

  navigate(path: string) {
    const destination = '/cryptobo4rd/' + path;
    this.router.navigate([destination]);
  }

  firstConnection() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(CbKeysModalComponent, {
        width: '600px',
        height: '400px',
        panelClass: 'customDialogContainer',
        disableClose: true,
        data: { name: this._CbStorageService.getUserEmail() }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    });
  }

  loadCurrencies(): void {
    this.NO_EXCHANGE = false;
    this._CbApiService.genericRequest(CbConstants.REQUESTS.GET_CURRENCIES_DETAILS, [
      this.ACTIVE_ACCOUNT
    ]).subscribe(result => {
      console.log('GET_CURRENCIES SUCCESS', result);
    }, error => {
      console.log('GET_CURRENCIES ERROR', error);
    });
  }

  setUpDashboard() {
    this.ready = true;
  }

  onSelect($event) {
    console.log('ON SELECT', $event);
  }
}
