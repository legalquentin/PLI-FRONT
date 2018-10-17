import { Component, OnInit } from '@angular/core';
import { CbEventService } from '../cb-services/cb-event.service';

@Component({
  selector: 'app-cb-cryptobo4rd',
  templateUrl: './cb-cryptobo4rd.component.html',
  styleUrls: ['./cb-cryptobo4rd.component.css']
})
export class CbCryptobo4rdComponent implements OnInit {

  constructor(
    public _CbEventService: CbEventService
  ) { }

  ngOnInit() {}
}
