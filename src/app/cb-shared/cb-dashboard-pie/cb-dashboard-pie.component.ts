import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, OnChanges, ViewChild } from '@angular/core';


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
  public otherCurrency = {
    label: '',
    sign: '',
    symbol: ''
  };
  public currentCurrency = {
    label: '',
    sign: '',
    symbol: ''
  };
  private _euro = {
    label: 'EUR',
    sign: '€',
    symbol: 'euro_symbol'
  };
  private _dollar = {
    label: 'USD',
    sign: '$',
    symbol: 'attach_money'
  };
  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentCurrency = this._euro;
    this.otherCurrency = this._dollar;
    for (const set of this.CONFIG) {
      set.value = set[this.currentCurrency.label.toLowerCase()];
    }
    this.DATA = this.CONFIG;
    this.LOADED = true;
    console.log(this.CONFIG);
  }

  formatValue = ($event) => {
    return $event + this.currentCurrency.sign;
  }

  updateValue(DATA: any) {
    console.log('UPDATE', DATA);
    for (const set of DATA) {
      set.value = set[this.currentCurrency.label.toLowerCase()];
    }
    this.DATA = DATA;
  }

  switchCurrency() {
    console.log('SWITCH VALUE');
    if (this.currentCurrency.label === 'EUR') {
      this.currentCurrency = this._dollar;
      this.otherCurrency = this._euro;
    } else {
      this.currentCurrency = this._euro;
      this.otherCurrency = this._dollar;
    }
    for (const set of this.DATA) {
      set.value = set[ this.currentCurrency.label.toLowerCase()];
    }
    this.DATA = Object.assign([], this.DATA);
  }
}
