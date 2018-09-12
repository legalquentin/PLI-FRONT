import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-cb-settings',
  templateUrl: './cb-settings.component.html',
  styleUrls: ['./cb-settings.component.css']
})
export class CbSettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {}

  ngOnInit() {
  }

}
