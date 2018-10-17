import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbConfirmModalComponent } from './cb-confirm-modal.component';

describe('CbConfirmModalComponent', () => {
  let component: CbConfirmModalComponent;
  let fixture: ComponentFixture<CbConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
