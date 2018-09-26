import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cb-widget-table',
  templateUrl: './cb-widget-table.component.html',
  styleUrls: ['./cb-widget-table.component.css']
})
export class CbWidgetTableComponent implements OnInit {
  @Language() lang: string;
  @Input() widget: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public columns: string[];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public lenght: number;

  constructor(
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    console.log(this.widget);
    this.lenght = 5;
    this.columns = this.widget.columns;
    // this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(this.widget.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = 4;
    this.dataSource.paginator.pageSize = 4;
  }
}
