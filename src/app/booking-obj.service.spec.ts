import { TestBed } from '@angular/core/testing';

import { BookingObjService } from './service/booking-obj.service';

describe('BookingObjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingObjService = TestBed.get(BookingObjService);
    expect(service).toBeTruthy();
  });
});
