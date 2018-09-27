import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';

@Component({
  selector: 'app-cb-menu-left',
  templateUrl: './cb-menu-left.component.html',
  styleUrls: ['./cb-menu-left.component.css']
})
export class CbMenuLeftComponent implements OnInit {
  @Language() lang: string;

  public currentUrl: string;
  public users = [];

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url.toUpperCase();
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_USERS).subscribe(result => {
      this.users = result.data;
    }, error => {
      console.error(error);
    });
  }

  navigate(dest: string) {
    const destination = '/cryptobo4rd/' + dest;
    if (destination.toUpperCase() !== this.currentUrl) {
      this.currentUrl = destination.toUpperCase();
      this.router.navigate([destination]);
    }
  }
}
