import { TestBed } from '@angular/core/testing';

import { CbSharedService } from './cb-shared.service';

describe('CbSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbSharedService = TestBed.get(CbSharedService);
    expect(service).toBeTruthy();
  });
});
