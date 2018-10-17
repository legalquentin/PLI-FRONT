import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbConfirmModalComponent } from '../cb-modals/cb-confirm-modal/cb-confirm-modal.component';
import { MatDialog } from '@angular/material';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { Observable } from 'rxjs';

interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-cb-exchange-accounts',
  templateUrl: './cb-exchange-accounts.component.html',
  styleUrls: ['./cb-exchange-accounts.component.css']
})
export class CbExchangeAccountsComponent implements OnInit {
  @Language()
  lang: string;
  @ViewChild('textTemplate')
  textTemplate: TemplateRef<any>;
  @ViewChild('buttonTemplate')
  buttonTemplate: TemplateRef<any>;
  @ViewChild('sliderTemplate')
  sliderTemplate: TemplateRef<any>;
  @ViewChild('iconButtonTemplate')
  iconButtonTemplate: TemplateRef<any>;

  public EXCHANGES: Array<any>;
  public ACCOUNTS = {
    columns: [],
    data: []
  };
  public publicKey: string;
  public privateKey: string;
  public LOADED = false;

  constructor(
    private translationService: TranslationService,
    private dialog: MatDialog,
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService
  ) {
    this.loadExchanges();
    this.publicKey = '';
    this.privateKey = '';
  }

  ngOnInit() { }

  openDialog(
    width: number,
    height: number,
    data: ConfirmDialogData
  ): Observable<any> {
    const dialogRef = this.dialog.open(CbConfirmModalComponent, {
      width: width + 'px',
      height: height + 'px',
      panelClass: 'customDialogContainer',
      disableClose: true,
      data: data
    });
    return dialogRef.afterClosed();
  }

  loadExchanges(): void {
    this._CbApiService
      .genericRequest(CbConstants.REQUESTS.LIST_PROVIDERS)
      .subscribe(
        result => {
          console.log(result);
          this.EXCHANGES = result.data;
          this.ACCOUNTS.columns.push({
            KEY: 'EXCHANGE',
            VIEW: this.textTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'SLIDER',
            VIEW: this.sliderTemplate
          });
          this.ACCOUNTS.columns.push({ KEY: 'DATE', VIEW: this.textTemplate });
          this.ACCOUNTS.columns.push({
            KEY: 'DELETE',
            VIEW: this.iconButtonTemplate
          });
          for (const exchange of this.EXCHANGES) {
            if (typeof exchange.value === 'string') {
              this.ACCOUNTS.data.push({
                EXCHANGE: exchange.name,
                SLIDER: true,
                DATE: '15/10/2018',
                DELETE: null
              });
            }
          }
          this.LOADED = true;
          console.log(this.ACCOUNTS);
        },
        error => {
          console.error('Failed to LIST_PROVIDERS', error);
        }
      );
  }

  createAccount(exchange: string): void {
    const payload = {
      URL_PARAM: [exchange],
      value: this.publicKey,
      sign: this.privateKey
    };
    this._CbApiService
      .genericRequest(CbConstants.REQUESTS.ADD_PROVIDERS, payload)
      .subscribe(
        result => {
          console.log('ADD_PROVIDERS on ' + exchange + ' SUCCESS', result);
        },
        error => {
          console.error('Failed to ADD_PROVIDERS', error);
        }
      );
  }

  delete(row: any): void {
    const trsl = this.translationService;
    const tpath = 'EXCHANGES.EDIT.DELETE.';
    const data = {
      title: trsl.translate(tpath + 'MODAL_TITLE'),
      message: trsl.translate(tpath + 'MODAL_BODY') + row.EXCHANGE + ' ?'
    };

    this.openDialog(500, 208, data).subscribe(result => {
      if (result) {
        // this._CbApiService.genericRequest(CbConstants.REQUESTS.)
      }
    });
  }
}
