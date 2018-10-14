import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbMessageTemplateComponent } from './cb-message-template.component';

describe('CbMessageTemplateComponent', () => {
  let component: CbMessageTemplateComponent;
  let fixture: ComponentFixture<CbMessageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbMessageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
