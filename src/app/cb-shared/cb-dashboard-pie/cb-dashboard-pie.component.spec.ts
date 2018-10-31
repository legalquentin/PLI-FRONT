import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbDashboardPieComponent } from './cb-dashboard-pie.component';

describe('CbDashboardPieComponent', () => {
  let component: CbDashboardPieComponent;
  let fixture: ComponentFixture<CbDashboardPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbDashboardPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbDashboardPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
