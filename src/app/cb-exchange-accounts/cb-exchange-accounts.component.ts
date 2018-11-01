import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbConfirmModalComponent } from '../cb-modals/cb-confirm-modal/cb-confirm-modal.component';
import { MatDialog } from '@angular/material';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ValidSelection } from '../cb-shared/cb-match-form';
import { CbDataTableComponent } from '../cb-data-table/cb-data-table.component';
import { CbSharedService } from '../cb-services/cb-shared.service';

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
  @ViewChild('topPanel')
  topPanel: any;
  @ViewChild('botPanel')
  botPanel: any;
  @ViewChild('dataTable')
  dataTable: CbDataTableComponent;
  @ViewChild('textTemplate')
  textTemplate: TemplateRef<any>;
  @ViewChild('buttonTemplate')
  buttonTemplate: TemplateRef<any>;
  @ViewChild('sliderTemplate')
  sliderTemplate: TemplateRef<any>;
  @ViewChild('iconRightsTemplate')
  iconRightsTemplate: TemplateRef<any>;
  @ViewChild('iconButtonTemplate')
  iconButtonTemplate: TemplateRef<any>;
  @ViewChild('dateTextTemplate')
  dateTextTemplate: TemplateRef<any>;

  public LOADED = false;
  public EXCHANGES: Array<any>;
  public ACCOUNTS = {
    columns: [],
    data: []
  };

  public matcher = new ValidSelection();

  public addFormGroup = new FormGroup({
    exchangeSelection: new FormControl('', [
      Validators.required
    ]),
    accountName: new FormControl('', [
      Validators.required
    ]),
    publicKey: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*')
    ]),
    privateKey: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*')
    ])
  });

  constructor(
    private translationService: TranslationService,
    private dialog: MatDialog,
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService,
    private _CbSharedService: CbSharedService
  ) {
    this.loadAccounts();
  }

  ngOnInit() {
    this.ACCOUNTS.columns = [
      {
        KEY: 'NAME',
        VIEW: this.textTemplate
      },
      {
        KEY: 'RIGHTS',
        VIEW: this.iconRightsTemplate
      },
      {
        KEY: 'EXCHANGE',
        VIEW: this.textTemplate
      },
      {
        KEY: 'ACTIVE',
        VIEW: this.sliderTemplate
      },
      {
        KEY: 'DATE',
        VIEW: this.dateTextTemplate
      },
      {
        KEY: 'DELETE',
        VIEW: this.iconButtonTemplate
      }
    ];
  }

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

  loadAccounts(): void {
    this._CbSharedService.getAccounts((err, accounts) => {
      if (!err) {
        this.EXCHANGES = this._CbSharedService.EXCHANGES;
        const data = [];
        for (const account of accounts) {
          data.push({
            ID: account.id,
            NAME: account.name,
            EXCHANGE: account.exchange,
            ACTIVE: account.active,
            DATE: account.dateOfCreation,
            RIGHTS: account.rights,
            DELETE: null
          });
        }
        this.ACCOUNTS = {
          columns: this.ACCOUNTS.columns,
          data: data
        };
        if (this.dataTable) {
          this.dataTable.reload(data);
        }
        this.LOADED = true;
      }
    });
  }

  createAccount(exchange: string): void {
    console.log(this.addFormGroup.get('exchangeSelection'), this.addFormGroup.get('exchangeSelection').value.name);
    const payload = {
      URL_PARAM: [this.addFormGroup.get('exchangeSelection').value.name],
      body: [{
        name: this.addFormGroup.get('accountName').value, // this.accountName,
        value: this.addFormGroup.get('publicKey').value, // this.publicKey,
        sign: this.addFormGroup.get('privateKey').value // this.privateKey
      }]
    };
    this._CbApiService
      .genericRequest(CbConstants.REQUESTS.ADD_PROVIDERS, payload)
      .subscribe(
        result => {
          console.log('ADD_PROVIDERS on ' + exchange + ' SUCCESS', result);
          this.topPanel.close();
          this.botPanel.open();
          this.loadAccounts();
          this.addFormGroup.reset();
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
      message: trsl.translate(tpath + 'MODAL_BODY') + row.EXCHANGE +
      ' "' + row.NAME + '" ?'
    };

    this.openDialog(500, 223, data).subscribe(result => {
      if (result) {
        this._CbApiService.genericRequest(
          CbConstants.REQUESTS.DELETE_PROVIDER_ACCOUNT,
          [row.ID]).subscribe(res => {
          console.log('DELETE_PROVIDER SUCCESS', res);
          this.loadAccounts();
        }, error => {
          console.log('DELETE_PROVIDER ERROR', error);
        });
      }
    });
  }
}
