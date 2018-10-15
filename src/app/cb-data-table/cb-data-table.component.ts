import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-cb-data-table',
  templateUrl: './cb-data-table.component.html',
  styleUrls: ['./cb-data-table.component.css']
})
export class CbDataTableComponent implements OnInit {
  @Language()
  lang: string;
  @Input()
  CONFIG: any;
  @ViewChild(MatPaginator)
  PAGINATOR: MatPaginator;

  public COLUMNS: Array<any>;
  public DISPLAYED_COLUMNS = [];
  public DATASOURCE: MatTableDataSource<any> = new MatTableDataSource([]);
  public LENGHT: number;
  public SELECTION: SelectionModel<any>;

  constructor(
    private translation: TranslationService
  ) {}

  ngOnInit() {
    const initialSelection = [];
    const allowMultiSelect = true;
    this.SELECTION = new SelectionModel<any>(
      allowMultiSelect,
      initialSelection
    );
    this.LENGHT = this.CONFIG.data.length;
    this.COLUMNS = this.CONFIG.columns;
    this.DISPLAYED_COLUMNS = this.COLUMNS.map(obj => obj.KEY);
    this.DATASOURCE = new MatTableDataSource(this.CONFIG.data);
    // this.SELECTION.select(this.DATASOURCE.data[1]);
    if (this.LENGHT > 10) {
      this.DATASOURCE.paginator = this.PAGINATOR;
      this.DATASOURCE.paginator.length = 4;
      this.DATASOURCE.paginator.pageSize = 4;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.SELECTION.selected.length;
    const numRows = this.DATASOURCE.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.SELECTION.clear()
      : this.DATASOURCE.data.forEach(row => this.SELECTION.select(row));
  }
}
