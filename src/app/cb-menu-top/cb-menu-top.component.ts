import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbEventService } from '../cb-services/cb-event.service';
import { fadeAnimation } from '../cb-shared/cb-animations';
import { CbSharedService } from '../cb-services/cb-shared.service';

@Component({
  selector: 'app-cb-menu-top',
  templateUrl: './cb-menu-top.component.html',
  styleUrls: ['./cb-menu-top.component.css'],
  animations: [
    fadeAnimation(300)
  ]
})
export class CbMenuTopComponent implements OnInit {
  @Language() lang: string;

  public selectLang: boolean;
  public ACCOUNTS = [];
  public selectedAccount: any;
  public selectGlobal = 0;
  public selectNone = -1;
  public accountIdentifier = '';

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    public _CbStorageService: CbStorageService,
    public _CbEventService: CbEventService,
    public _CbSharedService: CbSharedService
  ) {
    this.selectLang = false;
    this.selectedAccount = this.selectNone;
  }

  ngOnInit() {
    this.getAccounts();
    // this.accountIdentifier = this._CbStorageService.getUserFullName();
  }

  logout() {
    this._CbStorageService.clearSession();
    this.router.navigate(['/']);
  }

  account() {
    this.router.navigate(['/cryptobo4rd/account']);
  }

  exchangeAccounts() {
    this.router.navigate(['/cryptobo4rd/exchanges']);
  }

  getAccounts() {
    this._CbSharedService.getAccounts(() => {
      console.log(this._CbSharedService.ACCOUNTS);
      if (this._CbSharedService.ACCOUNTS.length === 1) {
        this.selectedAccount = this._CbSharedService.ACCOUNTS[0].id;
        this._CbStorageService.setActiveAccount(this.selectedAccount);
      } else if (this._CbSharedService.ACCOUNTS.length === 0) {
        this.selectedAccount = 0;
        this._CbStorageService.setActiveAccount(0);
      } else {
        console.log(this._CbStorageService.getActiveAccount());
        this.selectedAccount = this._CbSharedService.ACCOUNTS.map((item) => {
           return item.id;
        }).indexOf(this._CbStorageService.getActiveAccount());
      }
    });
  }

  setAccount(account) {
    this._CbStorageService.setActiveAccount(account.id);
  }
}
