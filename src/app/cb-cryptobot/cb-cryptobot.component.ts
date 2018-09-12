import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-cb-cryptobot',
  templateUrl: './cb-cryptobot.component.html',
  styleUrls: ['./cb-cryptobot.component.css']
})
export class CbCryptobotComponent implements OnInit {

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) {}

  ngOnInit() {
  }

}
