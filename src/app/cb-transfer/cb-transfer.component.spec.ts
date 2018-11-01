import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTransferComponent } from './cb-transfer.component';

describe('CbTransferComponent', () => {
  let component: CbTransferComponent;
  let fixture: ComponentFixture<CbTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
