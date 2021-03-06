import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbEventService } from '../cb-services/cb-event.service';
import { fadeAnimation } from '../cb-shared/cb-animations';
import { CbSharedService } from '../cb-services/cb-shared.service';
import { Subscription } from 'rxjs';

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

  public volumeSubscription: Subscription;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    public _CbStorageService: CbStorageService,
    public _CbEventService: CbEventService,
    public _CbSharedService: CbSharedService
  ) {
    this.selectLang = false;
    this.selectedAccount = 0;
  }

  ngOnInit() {}

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

  setAccount(account) {
    console.log(account);
    this._CbSharedService.CURRENT_ACCOUNT = account;
    this._CbSharedService.getAccount((err) => {
      if (!err) {
        console.log(this._CbSharedService.CURRENT_VOLUMES);
      }
    });
    this._CbStorageService.setActiveAccount(account.id);
  }
}
