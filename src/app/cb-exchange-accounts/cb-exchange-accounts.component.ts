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
  @ViewChild('iconRightsTemplate')
  iconRightsTemplate: TemplateRef<any>;
  @ViewChild('iconButtonTemplate')
  iconButtonTemplate: TemplateRef<any>;
  @ViewChild('dateTextTemplate')
  dateTextTemplate: TemplateRef<any>;

  public EXCHANGES: Array<any>;
  public ACCOUNTS = {
    columns: [],
    data: []
  };

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

  public LOADED = false;

  public selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  public selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  public nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  public matcher = new ValidSelection();

  constructor(
    private translationService: TranslationService,
    private dialog: MatDialog,
    private _CbApiService: CbApiService,
    private _CbStorageService: CbStorageService
  ) {
    this.loadExchanges();
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
          this.EXCHANGES = result.data;
          console.log(result);
          this.ACCOUNTS.columns.push({
            KEY: 'NAME',
            VIEW: this.textTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'RIGHTS',
            VIEW: this.iconRightsTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'EXCHANGE',
            VIEW: this.textTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'ACTIVE',
            VIEW: this.sliderTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'DATE',
            VIEW: this.dateTextTemplate
          });
          this.ACCOUNTS.columns.push({
            KEY: 'DELETE',
            VIEW: this.iconButtonTemplate
          });
          for (const exchange of this.EXCHANGES) {
            if (exchange.accounts.length > 0) {
              for (const account of exchange.accounts) {
                this.ACCOUNTS.data.push({
                  ID: account.provider_id,
                  NAME: account.name,
                  EXCHANGE: exchange.name,
                  ACTIVE: account.active,
                  DATE: account.dateOfCreation,
                  RIGHTS: account.rights,
                  DELETE: null
                });
              }
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
      value: '', // this.publicKey,
      sign: '' // this.privateKey
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
      message: trsl.translate(tpath + 'MODAL_BODY') + row.EXCHANGE +
      ' "' + row.NAME + '" ?'
    };

    this.openDialog(500, 223, data).subscribe(result => {
      if (result) {
        this._CbApiService.genericRequest(
          CbConstants.REQUESTS.DELETE_PROVIDER,
          [row.EXCHANGE, row.NAME]).subscribe(res => {
          console.log('DELETE_PROVIDER SUCCESS', res);
        }, error => {
          console.log('DELETE_PROVIDER ERROR', error);
        });
      }
    });
  }
}
