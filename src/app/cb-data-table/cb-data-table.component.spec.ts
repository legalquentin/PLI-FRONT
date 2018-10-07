import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbDataTableComponent } from './cb-data-table.component';

describe('CbDataTableComponent', () => {
  let component: CbDataTableComponent;
  let fixture: ComponentFixture<CbDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
