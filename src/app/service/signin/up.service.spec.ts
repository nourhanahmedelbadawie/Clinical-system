import { TestBed } from '@angular/core/testing';

import { UpService } from './up.service';

describe('UpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpService = TestBed.get(UpService);
    expect(service).toBeTruthy();
  });
});
