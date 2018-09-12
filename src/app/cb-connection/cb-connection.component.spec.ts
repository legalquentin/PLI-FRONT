import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbConnectionComponent } from './cb-connection.component';

describe('CbConnectionComponent', () => {
  let component: CbConnectionComponent;
  let fixture: ComponentFixture<CbConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
