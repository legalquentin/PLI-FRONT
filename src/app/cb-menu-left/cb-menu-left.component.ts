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

  public currentUrl: string;

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url.toUpperCase();
  }

  navigate(dest: string) {
    const destination = '/cryptobo4rd/' + dest;
    if (destination.toUpperCase() !== this.currentUrl) {
      this.currentUrl = destination.toUpperCase();
      this.router.navigate([destination]);
    }
  }
}
