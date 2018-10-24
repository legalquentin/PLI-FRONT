import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbDashboardGraphComponent } from './cb-dashboard-graph.component';

describe('CbDashboardGraphComponent', () => {
  let component: CbDashboardGraphComponent;
  let fixture: ComponentFixture<CbDashboardGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbDashboardGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbDashboardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
