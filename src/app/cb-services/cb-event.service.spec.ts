import { TestBed } from '@angular/core/testing';

import { CbEventService } from './cb-event.service';

describe('CbEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbEventService = TestBed.get(CbEventService);
    expect(service).toBeTruthy();
  });
});
