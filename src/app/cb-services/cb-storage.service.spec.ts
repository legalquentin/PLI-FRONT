import { TestBed } from '@angular/core/testing';

import { CbStorageService } from './cb-storage.service';

describe('CbStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbStorageService = TestBed.get(CbStorageService);
    expect(service).toBeTruthy();
  });
});
