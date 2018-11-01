import { Component, OnInit, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService, Language } from 'angular-l10n';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbApiService } from '../cb-services/cb-api.service';
// import { CbGetData } from './cb-getdata';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-cb-cryptobot',
  templateUrl: './cb-cryptobot.component.html',
  styleUrls: ['./cb-cryptobot.component.css'],
})
export class CbCryptobotComponent implements OnInit {

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
  ) { }
  @Language()
  lang: string;
  @ViewChild('testTemplate')
  textTemplate: TemplateRef<any>;
  @ViewChild('sliderTemplate')
  sliderTemplate: TemplateRef<any>;
  @ViewChild('iconButtonTemplate')
  iconButtonTemplate: TemplateRef<any>;
  @ViewChild('iconStatTemplate')
  iconStatTemplate: TemplateRef<any>;
  @ViewChild('graphbarline')
  graphbarline: TemplateRef<any>;

  public LOADED = false;
  public LOADED_TABLE2 = false;

  public CRYPTO_LIST = {
    columns: [],
    data: []
  };
  public TRANSFERS = {
    columns: [],
    data: []
  };
  public GRAPHLINEBAR = {
    view: 'view',
    scheme: 'colorScheme',
    results: 'multi',
    gradient: Boolean(false),
    xAxis: 'showXAxis',
    yAxis: 'showYAxis',
    legend: 'showLegend',
    showXAxisLabel: 'showXAxisLabel',
    showYAxisLabel: 'showYAxisLabel',
    xAxisLabel: 'xAxisLabel',
    yAxisLabel: 'yAxisLabel',
    autoScale: 'autoScale',
    timeline: 'timeline',
  };

  graph_bar_single = [
    {
      'name': '25/10/2018',
      'value': 15
    },
    {
      'name': '26/10/2018',
      'value': 18
    },
    {
      'name': '27/10/2018',
      'value': 12
    },
    {
      'name': '28/10/2018',
      'value': 17
    },
    {
      'name': '29/10/2018',
      'value': 21
    },
    {
      'name': '30/10/2018',
      'value': 15
    }
  ];
  graph_line_single = [
    {
      'name': 'Bitcoin',
      'series': [
        {
          'name': 'Lundi',
          'value': 35
        },
        {
          'name': 'Mardi',
          'value': 38
        },
        {
          'name': 'Mercredi',
          'value': 29
        },
        {
          'name': 'Jeudi',
          'value': 33
        },
      ]
    },
    {
      'name': 'LightCoint',
      'series': [
        {
          'name': 'Lundi',
          'value': 48
        },
        {
          'name': 'Mardi',
          'value': 16
        },
        {
          'name': 'Mercredi',
          'value': 18
        },
        {
          'name': 'Jeudi',
          'value': 20
        },
      ]
    },
    {
      'name': 'ZCoint',
      'series': [
        {
          'name': 'Lundi',
          'value': 35
        },
        {
          'name': 'Mardi',
          'value': 36
        },
        {
          'name': 'Mercredi',
          'value': 41
        },
        {
          'name': 'Jeudi',
          'value': 38
        },
      ]
    }
  ];

  graph_bar_multi = [];

  view: any[] = ['', 250];

  // graph options
  graph_bar_showXAxis = true;
  graph_bar_showYAxis = true;
  graph_bar_gradient = false;
  graph_bar_showLegend = false;
  graph_bar_showXAxisLabel = false;
  graph_bar_xAxisLabel = 'Jour';
  graph_bar_showYAxisLabel = false;
  graph_bar_yAxisLabel = 'Opération';

  graph_line_xAxis = true;
  graph_line_yAxis = true;
  graph_line_legend = true;

  colorScheme = {
    domain: ['#f9ca24', '#535c68', '#6ab04c', '#e056fd', '#f0932b', '#30336b']
  };

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.GRAPHLINEBAR.gradient = Boolean(false);

    this.TRANSFERS.columns.push({
      KEY: 'EXCHANGE',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'DATE',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'ORDER_TYPE',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'CRYPTO',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'NUMBER',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'PRICE',
      VIEW: this.textTemplate
    });
    this.TRANSFERS.columns.push({
      KEY: 'ACTIVE',
      VIEW: this.iconStatTemplate
    });
    this.TRANSFERS.data.push({
      EXCHANGE: 'Binance',
      DATE: '21/10/2018 18h56',
      ORDER_TYPE: 'Buy',
      PRICE: '15€99',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 1
    });
    this.TRANSFERS.data.push({
      EXCHANGE: 'salut',
      DATE: '24/10/2018 12h15',
      ORDER_TYPE: 'Sell',
      PRICE: '16€01',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 2
    });
    this.TRANSFERS.data.push({
      EXCHANGE: 'salut',
      DATE: '27/10/2018 9h11',
      ORDER_TYPE: 'Buy',
      PRICE: '15€98',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 3
    });
    this.LOADED = true;



    this.CRYPTO_LIST.columns.push({
      KEY: 'CRYPTO',
      VIEW: this.textTemplate
    });
    this.CRYPTO_LIST.columns.push({
      KEY: 'TOTAL_HAVE',
      VIEW: this.textTemplate
    });
    this.CRYPTO_LIST.columns.push({
      KEY: 'ACTIVE',
      VIEW: this.sliderTemplate
    });
    this.CRYPTO_LIST.columns.push({
      KEY: 'DELETE',
      VIEW: this.iconButtonTemplate
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Bitcoin',
      ACTIVE: true,
      TOTAL_HAVE: '16.589',
      DELETE: null
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Etherum',
      ACTIVE: false,
      TOTAL_HAVE: '16.589',
      DELETE: null
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'LiteCoin',
      ACTIVE: true,
      TOTAL_HAVE: '16.589',
      DELETE: null
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Zcash',
      DELETE: null
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Trukcoin',
      DELETE: null
    });
    this.LOADED_TABLE2 = true;
  }

  getVolume(amount, crypto_type) {
    /*const payload = {
      URL_PARAM: [amount, crypto_type]
    };
    this._CbApiService
      .genericRequest(CbGetData.REQUESTS.VOLUME, payload)
      .subscribe(
        result => {
          console.log('ADD_PROVIDERS on ' + amount + ' : ' + crypto_type + ' SUCCESS', result);
        },
        error => {
          console.error('Failed to ADD_PROVIDERS', error);
        }
      );*/
  }
  getDataList() {}
  getEchange() {
    /*const payload = {
      URL_PARAM: [exchange],
      value: '', // this.publicKey,
      sign: '' // this.privateKey
    };
    this._CbApiService
      .genericRequest(CbGetData.REQUESTS.ADD_PROVIDERS, payload)
      .subscribe(
        result => {
          console.log('ADD_PROVIDERS on ' + exchange + ' SUCCESS', result);
        },
        error => {
          console.error('Failed to ADD_PROVIDERS', error);
        }
      );*/
  }
  getStats() {}
  gatUseValue() {}
/*
  createAccount(exchange: string): void {
    const payload = {
      URL_PARAM: [exchange],
      value: '', // this.publicKey,
      sign: '' // this.privateKey
    };
    this._CbApiService
      .genericRequest(CbConstants.REQUESTS.ADD_PROVIDERS, payload)
      .subscribe(
        result => {
          console.log('ADD_PROVIDERS on ' + exchange + ' SUCCESS', result);
        },
        error => {
          console.error('Failed to ADD_PROVIDERS', error);
        }
      );
  }*/
}
