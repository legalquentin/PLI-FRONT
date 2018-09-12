import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { doAnimation } from '../cb-shared/animations';

@Component({
  selector: 'app-cb-menu-top',
  templateUrl: './cb-menu-top.component.html',
  styleUrls: ['./cb-menu-top.component.css']
})
export class CbMenuTopComponent implements OnInit {
  @Language() lang: string;

  public selectLang: boolean;
  public anim = {
    language: {
      state: 'inactive'
    }
  };
    constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {
    this.selectLang = false;
  }

  ngOnInit() {
    console.log(this.lang);
  }

  selectLocale(language: string, country: string, currency: string) {
    doAnimation(300, this.anim.language, () => {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
     });
  }

  logout() {
    this.router.navigate(['/']);
  }
}
