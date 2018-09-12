import { Component, OnInit } from '@angular/core';
import { Language, TranslationService, LocaleService } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cb-menu-left',
  templateUrl: './cb-menu-left.component.html',
  styleUrls: ['./cb-menu-left.component.css']
})
export class CbMenuLeftComponent implements OnInit {
  @Language() lang: string;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {}

  ngOnInit() {
  }

  navigate(dest: string) {
    const destination = '/cryptobo4rd/' + dest;
    if (destination.toUpperCase() !== this.router.url.toUpperCase()) {
      this.router.navigate([destination]);
    }
  }
}
