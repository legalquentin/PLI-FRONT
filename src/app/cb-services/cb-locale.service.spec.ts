import { TestBed } from '@angular/core/testing';

import { CbLocaleService } from './cb-locale.service';

describe('CbLocaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbLocaleService = TestBed.get(CbLocaleService);
    expect(service).toBeTruthy();
  });
});
