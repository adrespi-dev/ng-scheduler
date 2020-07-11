import { TestBed } from '@angular/core/testing';

import { CalendarDaysProviderService } from './calendar-days-provider.service';

describe('CalendarDaysProviderService', () => {
  let service: CalendarDaysProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDaysProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
