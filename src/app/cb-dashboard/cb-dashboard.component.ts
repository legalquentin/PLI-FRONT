import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cb-dashboard',
  templateUrl: './cb-dashboard.component.html',
  styleUrls: ['./cb-dashboard.component.css']
})
export class CbDashboardComponent implements OnInit {
  @Language() lang: string;

  public configWidget1 = {
    name: '100 Latest trades ETH-USDT',
    key: 'ETHUSDT',
    value: 'ETH',
    colors: ['#5AA454']
  };
  public configWidget2 = {
    name: '100 Latest trades BTC-USDT',
    key: 'BTCUSDT',
    value: 'BTC',
    colors: ['#C7B42C']
  };
  public configKpi1 = {
    data: {
      name: 'BTC',
      value: 6266,
    },
    bandColor: '#5AA454'
  };
  public configKpi2 = {
    data: {
      name: 'ETH',
      value: 191,
    },
    bandColor: '#C7B42C'
  };
  public configKpi3 = {
    data: {
      name: 'TRN',
      value: 124,
    },
    bandColor: '#A10A28'
  };
  public configKpi4 = {
    data: {
      name: 'MNR',
      value: 380,
    },
    bandColor: '#AAAAAA'
  };

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {}

  ngOnInit() {}
}
