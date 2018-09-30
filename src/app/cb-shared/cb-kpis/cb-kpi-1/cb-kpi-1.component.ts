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
  public cardColor = '#212227';
  public bandColor = '#5AA454';

  // line, area
  public autoScale = true;

  constructor() {}

  ngOnInit() {
    this.bandColor = this.kpi.bandColor;
    this.data[0] = this.kpi.data;
  }

  onSelect(event) {
    console.log(event);
  }
}
