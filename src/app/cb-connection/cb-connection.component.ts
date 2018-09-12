import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';
import { fadeAnimation, doAnimation } from '../cb-shared/animations';

@Component({
  selector: 'app-cb-connection',
  templateUrl: './cb-connection.component.html',
  styleUrls: ['./cb-connection.component.css'],
  animations: [
    fadeAnimation(300)
  ]
})
export class CbConnectionComponent implements OnInit {
  @Language() lang: string;

  public action = false;
  public register: boolean;
  public changeButton: string;
  public anim = {
    language: {
      state: 'inactive'
    },
    login: {
      state: 'inactive'
    }
  };

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) { }

  ngOnInit() {
    this.register = true;
    this.changeButton = this.translation.translate('CONNECTION.LOGIN.BUTTON');
  }

  selectLocale(language: string, country: string, currency: string): void {
    doAnimation(300, this.anim.language, () => {
      this.locale.setCurrentLanguage(language);
      this.locale.setDefaultLocale(language, country);
      this.locale.setCurrentCurrency(currency);
     });
  }

  changeForm() {
    doAnimation(400, this.anim.login, () => {
      this.register = !this.register;
      this.changeButton = this.translation.translate(
        (this.register) ? 'CONNECTION.LOGIN.BUTTON' : 'CONNECTION.REGISTER.BUTTON'
      );
    });
  }

  doRegister() {
    this.router.navigate(['cryptobo4rd/dashboard']);
  }

  doLogin() {
    this.router.navigate(['cryptobo4rd/dashboard']);
  }
}
