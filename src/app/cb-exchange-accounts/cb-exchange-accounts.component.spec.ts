import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbExchangeAccountsComponent } from './cb-exchange-accounts.component';

describe('CbExchangeAccountsComponent', () => {
  let component: CbExchangeAccountsComponent;
  let fixture: ComponentFixture<CbExchangeAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbExchangeAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbExchangeAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
