import { Component } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Language() lang: string;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService) {
  }
  title = 'cryptobo4rd';
}
