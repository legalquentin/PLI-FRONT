import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbCryptobo4rdComponent } from './cb-cryptobo4rd.component';

describe('CbCryptobo4rdComponent', () => {
  let component: CbCryptobo4rdComponent;
  let fixture: ComponentFixture<CbCryptobo4rdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbCryptobo4rdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbCryptobo4rdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
