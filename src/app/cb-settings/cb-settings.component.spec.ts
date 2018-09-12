import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSettingsComponent } from './cb-settings.component';

describe('CbSettingsComponent', () => {
  let component: CbSettingsComponent;
  let fixture: ComponentFixture<CbSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
