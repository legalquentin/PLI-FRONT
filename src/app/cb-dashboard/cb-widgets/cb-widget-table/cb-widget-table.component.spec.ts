import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbWidgetTableComponent } from './cb-widget-table.component';

describe('CbWidgetTableComponent', () => {
  let component: CbWidgetTableComponent;
  let fixture: ComponentFixture<CbWidgetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbWidgetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbWidgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
