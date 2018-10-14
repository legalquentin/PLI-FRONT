import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTransactionComponent } from './cb-transaction.component';

describe('CbTransactionComponent', () => {
  let component: CbTransactionComponent;
  let fixture: ComponentFixture<CbTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
