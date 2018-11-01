import { Component, OnInit } from '@angular/core';
import { CbEventService } from '../cb-services/cb-event.service';
import { CbSharedService } from '../cb-services/cb-shared.service';

@Component({
  selector: 'app-cb-cryptobo4rd',
  templateUrl: './cb-cryptobo4rd.component.html',
  styleUrls: ['./cb-cryptobo4rd.component.css']
})
export class CbCryptobo4rdComponent implements OnInit {

  constructor(
    public _CbEventService: CbEventService,
    public _cbSharedServcice: CbSharedService
  ) {}

  ngOnInit() {
    this._cbSharedServcice.init();
  }
}
