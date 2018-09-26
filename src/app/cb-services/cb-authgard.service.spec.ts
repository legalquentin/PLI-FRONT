import { TestBed } from '@angular/core/testing';

import { CbAuthgardService } from './cb-authgard.service';

describe('CbAuthgardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbAuthgardService = TestBed.get(CbAuthgardService);
    expect(service).toBeTruthy();
  });
});
