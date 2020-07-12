import { TestBed } from '@angular/core/testing';

import { ReminderEditingService } from './reminder-editing.service';

describe('ReminderEditingService', () => {
  let service: ReminderEditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReminderEditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
