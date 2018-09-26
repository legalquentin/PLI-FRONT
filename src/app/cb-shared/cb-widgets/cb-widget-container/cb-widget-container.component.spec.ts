import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbWidgetContainerComponent } from './cb-widget-container.component';

describe('CbWidgetContainerComponent', () => {
  let component: CbWidgetContainerComponent;
  let fixture: ComponentFixture<CbWidgetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbWidgetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
