import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbWidgetLineChartComponent } from './cb-widget-line-chart.component';

describe('CbWidgetLineChartComponent', () => {
  let component: CbWidgetLineChartComponent;
  let fixture: ComponentFixture<CbWidgetLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbWidgetLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbWidgetLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
