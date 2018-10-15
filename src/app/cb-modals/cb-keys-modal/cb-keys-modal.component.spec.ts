import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbKeysModalComponent } from './cb-keys-modal.component';

describe('CbKeysModalComponent', () => {
  let component: CbKeysModalComponent;
  let fixture: ComponentFixture<CbKeysModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbKeysModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbKeysModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
