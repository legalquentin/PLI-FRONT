import { TestBed } from '@angular/core/testing';

import { CbApiService } from './cb-api.service';

describe('CbApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbApiService = TestBed.get(CbApiService);
    expect(service).toBeTruthy();
  });
});
