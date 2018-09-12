import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbCryptobotComponent } from './cb-cryptobot.component';

describe('CbCryptobotComponent', () => {
  let component: CbCryptobotComponent;
  let fixture: ComponentFixture<CbCryptobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbCryptobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbCryptobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
