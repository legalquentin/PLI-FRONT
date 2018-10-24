import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cb-dashboard-graph',
  templateUrl: './cb-dashboard-graph.component.html',
  styleUrls: ['./cb-dashboard-graph.component.css']
})
export class CbDashboardGraphComponent implements OnInit {
  @Input() CONFIG: any;

  public DATA: Array<any>;
  public LOADED = false;
  public VIEW = [680, 330];
  public GRID_CONFIG = {
    showXAxis: false,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    yFormat: this.yFormat,
    yAxisLabel: 'ETH - USDT',
    animations: true
  };

  constructor() {}

  ngOnInit() {
    this.DATA = this.CONFIG.DATA;
    this.LOADED = this.CONFIG.LOADED;
  }

  formatValue($event) {
    console.log('format', $event);
    return $event + '$';
  }

  yFormat($event) {
    console.log('YFORMAT', $event);
    return $event;
  }
}
