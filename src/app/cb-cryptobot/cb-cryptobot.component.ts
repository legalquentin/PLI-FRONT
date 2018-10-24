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
      VIEW: this.textTemplate
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut',
      DATE: '16/20/2004',
      ORDER_TYPE: 'dqbdsdgbdgb',
      PRICE: '15€',
      CRYPTO: 'bitcoin',
      NUMBER: '0.002',
      ACTIVE: 'en coure'
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut'
    });
    this.TRANSACTIONS.data.push({
      EXCHANGE: 'salut'
    });
    this.LOADED = true;



    this.CRYPTO_LIST.columns.push({
      KEY: 'CRYPTO',
      VIEW: this.textTemplate
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Bitcoin'
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Etherum'
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'LiteCoin'
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Zcash'
    });
    this.CRYPTO_LIST.data.push({
      CRYPTO: 'Trukcoin'
    });
    this.LOADED_TABLE2 = true;
  }

}
