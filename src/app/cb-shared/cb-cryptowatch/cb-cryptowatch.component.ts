import { Component, OnInit, Input } from '@angular/core';
import CryptowatchEmbed from 'cryptowatch-embed';

@Component({
  selector: 'app-cb-cryptowatch',
  templateUrl: './cb-cryptowatch.component.html',
  styleUrls: ['./cb-cryptowatch.component.css']
})
export class CbCryptowatchComponent implements OnInit {
  @Input() config: any;

  public chart: any;

  constructor() {}

  ngOnInit() {
    this.chart = new CryptowatchEmbed(this.config.exchange, this.config.currency); // 'bitfinex', 'btcusd');
    this.chart.mount('#chart-container');
  }
}
