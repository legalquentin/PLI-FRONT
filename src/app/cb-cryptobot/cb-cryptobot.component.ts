import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService, Language } from 'angular-l10n';

@Component({
  selector: 'app-cb-cryptobot',
  templateUrl: './cb-cryptobot.component.html',
  styleUrls: ['./cb-cryptobot.component.css']
})
export class CbCryptobotComponent implements OnInit {
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

public LOADED = false;
public LOADED_TABLE2 = false;

public CRYPTO_LIST = {
  columns: [],
  data: []
};
public TRANSACTIONS = {
  columns: [],
  data: []
};

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) { }

  ngOnInit() {
    this.TRANSACTIONS.columns.push({
      KEY: 'EXCHANGE',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'DATE',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'ORDER_TYPE',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'CRYPTO',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'NUMBER',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'PRICE',
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.columns.push({
      KEY: 'ACTIVE',
      VIEW: this.iconStatTemplate
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut',
      DATE: '16/20/2004',
      ORDER_TYPE: 'dqbdsdgbdgb',
      PRICE: '15€',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 1
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut',
      DATE: '16/20/2004',
      ORDER_TYPE: 'dqbdsdgbdgb',
      PRICE: '15€',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 2
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut',
      DATE: '16/20/2004',
      ORDER_TYPE: 'dqbdsdgbdgb',
      PRICE: '15€',
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

}
