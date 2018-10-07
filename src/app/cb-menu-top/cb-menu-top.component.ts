import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { doAnimation, fadeAnimation } from '../cb-shared/animations';
import { FormGroup } from '@angular/forms';
import { CbStorageService } from '../cb-services/cb-storage.service';
import { CbEventService } from '../cb-services/cb-event.service';

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
  public exchanges = [];
  public selectedExchange: any;
  public selectGlobal = 0;
  public selectNone = -1;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbStorageService: CbStorageService,
    public _CbEventService: CbEventService
  ) {
    this.selectLang = false;
    this.selectedExchange = this.selectNone;
  }

  ngOnInit() {
    console.log(this.lang);
  }

  logout() {
    this._CbStorageService.clearSession();
    this.router.navigate(['/']);
  }

  account() {
    this.router.navigate(['/cryptobo4rd/account']);
  }
}
