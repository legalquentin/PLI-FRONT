import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-cb-kpi-1',
  templateUrl: './cb-kpi-1.component.html',
  styleUrls: ['./cb-kpi-1.component.css']
})
export class CbKpi1Component implements OnInit {
  @Language() lang: string;
  @Input() kpi: any;

  public data = [
    {
      'name': 'BTC',
      'value': 6480
    }
  ];

  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = false;
  public showYAxisLabel = false;
  public yAxisLabel = 'ETH - USDT';
  public animations = true;

  public view = [260, 230];
  public cardColor = 'var(--back-color)';
  public bandColor = '#5AA454';

  // line, area
  public autoScale = true;
  public imagepath = '/src/assets/cryptos/svg/color/';
  constructor() {}

  ngOnInit() {
    // this.bandColor = this.kpi.bandColor;
    // this.data[0] = this.kpi.data;
    if (typeof this.kpi !== 'undefined') {
      this.data[0] = {
        name: this.kpi.currency,
        value: this.kpi.free
      };
      this.imagepath += this.kpi.currency.toLowerCase() + '.svg';
    } else {
      this.imagepath += 'btc.svg';
    }
  }

  onSelect(event) {
    console.log(event);
  }
}
