import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';

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

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.DATA = this.CONFIG;
    this.LOADED = true;
    console.log(this.CONFIG);
  }

  formatValue($event) {
    // console.log('format', $event);
    return $event + '$';
  }

  updateValue(DATA: any) {
    console.log('UPDATE', DATA);
    this.DATA = DATA;
  }
}
