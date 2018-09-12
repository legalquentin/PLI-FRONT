import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbMenuLeftComponent } from './cb-menu-left.component';

describe('CbMenuLeftComponent', () => {
  let component: CbMenuLeftComponent;
  let fixture: ComponentFixture<CbMenuLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbMenuLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
