import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbSocialComponent } from './cb-social.component';

describe('CbSocialComponent', () => {
  let component: CbSocialComponent;
  let fixture: ComponentFixture<CbSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
