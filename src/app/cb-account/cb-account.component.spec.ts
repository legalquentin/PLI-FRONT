import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbAccountComponent } from './cb-account.component';

describe('CbAccountComponent', () => {
  let component: CbAccountComponent;
  let fixture: ComponentFixture<CbAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
