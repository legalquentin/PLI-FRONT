import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-cb-widget-table',
  templateUrl: './cb-widget-table.component.html',
  styleUrls: ['./cb-widget-table.component.css']
})
export class CbWidgetTableComponent implements OnInit {
  @Language() lang: string;
  @Input() widget: any;

  public displayedColumns: string[] = ['currency', 'value', 'amount', 'date'];
  public dataSource = [
    { currency: 'ETH', value: 132, amount: 0.132, date: '08/12/1995 08:12:34' },
    { currency: 'BTC', value: 0.2, amount: 0.2, date: '08/12/1995 08:11:34' },
    { currency: 'ETH', value: 141, amount: 0.004, date: '08/12/1995 08:09:34' },
    { currency: 'ETH', value: 128, amount:  0.044, date: '08/12/1995 08:03:34' },
    { currency: 'TRN', value: 2, amount: 9, date: '08/12/1995 08:01:34' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
