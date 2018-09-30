import { Component, OnInit } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cb-account',
  templateUrl: './cb-account.component.html',
  styleUrls: ['./cb-account.component.css']
})
export class CbAccountComponent implements OnInit {
  @Language() lang: string;

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
  }

}
