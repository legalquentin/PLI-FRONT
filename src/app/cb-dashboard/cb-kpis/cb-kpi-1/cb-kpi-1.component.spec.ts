import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbKpi1Component } from './cb-kpi-1.component';

describe('CbKpi1Component', () => {
  let component: CbKpi1Component;
  let fixture: ComponentFixture<CbKpi1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbKpi1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbKpi1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
