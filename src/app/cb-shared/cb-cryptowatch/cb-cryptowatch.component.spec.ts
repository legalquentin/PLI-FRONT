import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbCryptowatchComponent } from './cb-cryptowatch.component';

describe('CbCryptowatchComponent', () => {
  let component: CbCryptowatchComponent;
  let fixture: ComponentFixture<CbCryptowatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbCryptowatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbCryptowatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
