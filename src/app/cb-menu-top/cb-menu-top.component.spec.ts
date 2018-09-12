import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbMenuTopComponent } from './cb-menu-top.component';

describe('CbMenuTopComponent', () => {
  let component: CbMenuTopComponent;
  let fixture: ComponentFixture<CbMenuTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbMenuTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbMenuTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
