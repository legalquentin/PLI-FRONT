import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-cb-dashboard-table',
  templateUrl: './cb-dashboard-table.component.html',
  styleUrls: ['./cb-dashboard-table.component.css']
})
export class CbDashboardTableComponent implements OnInit {
  @Input() CONFIG: any;
  @ViewChild('textTemplate')
  textTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate')
  statusTemplate: TemplateRef <any>;

  public TABLE_CONFIG = {
    columns: [],
    data: []
  };
  public LOADED = false;

  public LABEL_STATUS = [
    'CANCELLED',
    'CLOSED'
  ];

  constructor() {}

  ngOnInit() {
    this.TABLE_CONFIG.columns.push({
      KEY: 'PAIR',
      VIEW: this.textTemplate
    });
    this.TABLE_CONFIG.columns.push({
      KEY: 'VOLUME',
      VIEW: this.textTemplate
    });
    this.TABLE_CONFIG.columns.push({
      KEY: 'DATE',
      VIEW: this.textTemplate
    });
    this.TABLE_CONFIG.columns.push({
      KEY: 'EXCHANGE',
      VIEW: this.textTemplate
    });
    this.TABLE_CONFIG.columns.push({
      KEY: 'STATUS',
      VIEW: this.statusTemplate
    });
    this.TABLE_CONFIG.data = [{
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 0
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 0
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 0
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 0
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 0
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    },
    {
      PAIR: 'XBTEUR',
      VOLUME: 0.0039,
      DATE: '08/12/2018',
      EXCHANGE: 'KRAKEN',
      STATUS: 1
    }];
    this.LOADED = true;
  }

}
