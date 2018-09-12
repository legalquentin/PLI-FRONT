import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbDashboardComponent } from './cb-dashboard.component';

describe('CbDashboardComponent', () => {
  let component: CbDashboardComponent;
  let fixture: ComponentFixture<CbDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
