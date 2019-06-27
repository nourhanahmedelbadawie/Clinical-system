import { TestBed } from '@angular/core/testing';

import { AuthredirecturlService } from './authredirecturl.service';

describe('AuthredirecturlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthredirecturlService = TestBed.get(AuthredirecturlService);
    expect(service).toBeTruthy();
  });
});
