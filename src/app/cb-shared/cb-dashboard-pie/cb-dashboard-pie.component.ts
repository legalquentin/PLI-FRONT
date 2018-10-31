import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cb-dashboard-pie',
  templateUrl: './cb-dashboard-pie.component.html',
  styleUrls: ['./cb-dashboard-pie.component.css']
})
export class CbDashboardPieComponent implements OnInit {
  @Input() CONFIG: any;

  public DATA: Array<any>;
  public LOADED = false;
  public VIEW = [600, 200];

  constructor() {

  }

  ngOnInit() {
    this.DATA = this.CONFIG.DATA;
    this.LOADED = this.CONFIG.LOADED;
  }

  formatValue($event) {
    // console.log('format', $event);
    return $event + '$';
  }
}
