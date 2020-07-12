import { TestBed } from '@angular/core/testing';

import { RemindersFilteringService } from './reminders-filtering.service';

describe('RemindersFilteringService', () => {
  let service: RemindersFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemindersFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
