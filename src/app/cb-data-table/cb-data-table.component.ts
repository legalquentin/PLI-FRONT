import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Language } from 'angular-l10n';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-cb-data-table',
  templateUrl: './cb-data-table.component.html',
  styleUrls: ['./cb-data-table.component.css']
})
export class CbDataTableComponent implements OnInit {
  @Language() lang: string;
  @Input() config: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}
