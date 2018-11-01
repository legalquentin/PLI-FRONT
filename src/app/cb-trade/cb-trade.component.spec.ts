import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTradeComponent } from './cb-trade.component';

describe('CbTradeComponent', () => {
  let component: CbTradeComponent;
  let fixture: ComponentFixture<CbTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
