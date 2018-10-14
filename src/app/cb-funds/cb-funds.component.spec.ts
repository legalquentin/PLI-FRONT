import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbFundsComponent } from './cb-funds.component';

describe('CbFundsComponent', () => {
  let component: CbFundsComponent;
  let fixture: ComponentFixture<CbFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
