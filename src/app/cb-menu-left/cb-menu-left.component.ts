import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { CbApiService } from '../cb-services/cb-api.service';
import { CbConstants } from '../cb-shared/cb-constants';
import { CbEventService } from '../cb-services/cb-event.service';
import { fadeAnimation } from '../cb-shared/cb-animations';

@Component({
  selector: 'app-cb-menu-left',
  templateUrl: './cb-menu-left.component.html',
  styleUrls: ['./cb-menu-left.component.css'],
  animations: [
    fadeAnimation(300)
  ]
})
export class CbMenuLeftComponent implements OnInit {
  @Language() lang: string;

  public currentUrl: string;
  public USERS = [];
  public avatars = [
    'https://www.w3schools.com/howto/img_avatar.png',
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/w3images/avatar2.png',
    'https://www.w3schools.com/w3images/avatar6.png',
    'https://www.w3schools.com/w3images/avatar5.png'
  ];

  constructor(
    public router: Router,
    private translation: TranslationService,
    private locale: LocaleService,
    private _CbApiService: CbApiService,
    public _CbEventService: CbEventService
    ) {}

  ngOnInit() {
    this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_USERS).subscribe(result => {
      console.log('LIST_USERS', result);
      this.USERS = result;
      for (const user of this.USERS) {
        user.avatar = this.avatars[this.getRandom()];
      }
    }, error => {
      console.error('LIST_USERS', error);
    });
    // this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_CONFIGURATIONS).subscribe(result => {
    //   console.log('LIST_CONFIGURATIONS', result);
    // }, error => {
    //   console.error('LIST_CONFIGURATIONS', error);
    // });
    // this._CbApiService.genericRequest(CbConstants.REQUESTS.LIST_PROVIDERS).subscribe(result => {
    //   console.log('LIST_PROVIDERS', result);
    // }, error => {
    //   console.error('LIST_PROVIDERS', error);
    // });
    // this._CbApiService.account().subscribe(r => {
    //   console.log(r);
    // }, err => {
    //   console.log(err);
    // });
  }

  navigate(dest: string) {
    const destination = '/cryptobo4rd/' + dest;
    if (destination.toUpperCase() !== this.router.url.toUpperCase()) {
      this.router.navigate([destination]);
    }
  }

  rand() {
    console.log('random');
  }

  getRandom() {
    return Math.floor((Math.random() * this.avatars.length));
  }
}
