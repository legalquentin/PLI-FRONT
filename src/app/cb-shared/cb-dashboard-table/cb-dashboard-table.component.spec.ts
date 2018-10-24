import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbDashboardTableComponent } from './cb-dashboard-table.component';

describe('CbDashboardTableComponent', () => {
  let component: CbDashboardTableComponent;
  let fixture: ComponentFixture<CbDashboardTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbDashboardTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
