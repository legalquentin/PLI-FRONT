import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-cb-cryptobot',
  templateUrl: './cb-cryptobot.component.html',
  styleUrls: ['./cb-cryptobot.component.css']
})
export class CbCryptobotComponent implements OnInit {

  public globalsLines = {
    name: 'Bots net revenues',
    values: ['ETH', 'BTC', 'TRN'],
    colors: ['#5AA454', '#4f34f6', '#f34d23'],
    view: [350, 200]
  };

  public configBotLatest = {
    columns: ['test', 'again', 'hello', 'world'],
    data: [
      { test: 'to', again: 132, hello: 0.132, world: '08/12/1995 08:12:34' },
      { test: 'BTC', again: 0.2, hello: 0.2, world: '08/12/1995 08:11:34' },
      { test: 'to', again: 132, hello: 0.132, world: '08/12/1995 08:12:34' },
      { test: 'BTC', again: 0.2, hello: 0.2, world: '08/12/1995 08:11:34' },
      { test: 'to', again: 132, hello: 0.132, world: '08/12/1995 08:12:34' },
      { test: 'BTC', again: 0.2, hello: 0.2, world: '08/12/1995 08:11:34' },
      { test: 'to', again: 132, hello: 0.132, world: '08/12/1995 08:12:34' },
      { test: 'BTC', again: 0.2, hello: 0.2, world: '08/12/1995 08:11:34' },
      { test: 'to', again: 132, hello: 0.132, world: '08/12/1995 08:12:34' },
      { test: 'BTC', again: 0.2, hello: 0.2, world: '08/12/1995 08:11:34' }
    ]
  };

  constructor(
    private router: Router,
    private translation: TranslationService,
    private locale: LocaleService
  ) { }

  ngOnInit() {
  }

}
