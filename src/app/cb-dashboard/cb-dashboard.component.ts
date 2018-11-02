import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { MatDialog } from '@angular/material';
import { CbKeysModalComponent } from '../cb-modals/cb-keys-modal/cb-keys-modal.component';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
// import { cryptowatch } from '../../../node_modules/cryptowatch-embed/src/main.js'
import CryptowatchEmbed from 'cryptowatch-embed';
import { CbSharedService } from '../cb-services/cb-shared.service';
import { Subscription } from 'rxjs';
import { CbDashboardPieComponent } from '../cb-shared/cb-dashboard-pie/cb-dashboard-pie.component';
import { CbDashboardGraphComponent } from '../cb-shared/cb-dashboard-graph/cb-dashboard-graph.component';
declare var $: any;
@Component({
  selector: 'app-cb-dashboard',
  templateUrl: './cb-dashboard.component.html',
  styleUrls: ['./cb-dashboard.component.css']
})
export class CbDashboardComponent implements OnInit {
  @Language() lang: string;
  @ViewChild('refPie')
  refPie: CbDashboardPieComponent;
  @ViewChild('refGraph')
  refGraph: CbDashboardGraphComponent;
  public chart: any;
  public volumeSubscription: Subscription;
  public historySubscription: Subscription;

  public PIE_CONFIG = [];
  public GRAPH_CONFIG = [];
  public TABLE_CONFIG = {};

  public READY = {
    TABLE: false,
    PIE: false,
    GRAPH: false
  };

  public ACCOUNTS = [];
  public ACTIVE_ACCOUNT = {};
  public VOLUMES = {};
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
    private _CbApiService: CbApiService,
    public _CbSharedService: CbSharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.volumeSubscription = this._CbSharedService.CURRENT_VOLUMES.subscribe(
      (item) => {
        this.NO_EXCHANGE = false;
        if (item !== null) {
          console.log('update', item);
          this.PIE_CONFIG = this.formatVolumes(item);
          if (this.READY.PIE && typeof this.refPie !== 'undefined') {
            this.refPie.updateValue(this.PIE_CONFIG);
          }
          this.READY.PIE = true;
        }
    });
    this.historySubscription = this._CbSharedService.VOLUMES_HISTORY.subscribe(
      (item) => {
        // this.NO_EXCHANGE = false;
        if (item !== null) {
          console.log('GRAPH_CONFIG', item);
          this.GRAPH_CONFIG = item;
          if (this.READY.GRAPH && typeof this.refGraph !== 'undefined') {
            this.refGraph.updateValue(this.GRAPH_CONFIG);
          }
          this.READY.GRAPH = true;
        }
    });

    this.ACCOUNTS = this._CbStorageService.getAccounts();

    if (this._CbStorageService.firstConnection()) {
      // First connection
      this.firstConnection();
    } else if (this.ACCOUNTS.length === 0) {
      // No accounts to read from
      this.noAccounts();
    } else {
      // load dashboard
      this.setUpDashboard();
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

  noAccounts() {

  }

  setUpDashboard() {
    this.ACCOUNTS = this._CbSharedService.ACCOUNTS;
    this.ACTIVE_ACCOUNT = this._CbSharedService.CURRENT_ACCOUNT;
    //   this.READY.PIE = true;
    // });
    if (this.ACCOUNTS.length !== 0) {
      this.NO_EXCHANGE = false;
    }
    this.loadCurrencies();

    // let year = 2010;

    // for (let i = 0; i !== 50; i++) {
    //   this.GRAPH_CONFIG.DATA[0].series.push({
    //     'name': year + '/' + i % 12 + 1,
    //     'value': Math.random() * 50 + 20
    //   });
    //   this.GRAPH_CONFIG.DATA[1].series.push({
    //     'name': year + '/' + i % 12 + 1,
    //     'value': Math.random() * 50
    //   });
    //   if (i % 12 === 0) {
    //     year++;
    //   }
    // }

    // this.READY.GRAPH = true;
    this.READY.TABLE = true;
  }

  loadCurrencies(): void {
  }

  onSelect($event) {
    console.log('ON SELECT', $event);
  }

  formatVolumes(volumes: any) {
    const dataSet = [];
    for (const key of Object.keys(volumes)) {
      dataSet.push({
        name: key,
        amount: volumes[key].Amount,
        usd: volumes[key].Value.USD,
        eur: volumes[key].Value.EUR,
        value: 0
        // value: volumes[key].Value.EUR,
      });
    }
    return dataSet;
  }
}
