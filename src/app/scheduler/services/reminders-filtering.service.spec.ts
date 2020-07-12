import { TestBed } from "@angular/core/testing";

import { RemindersFilteringService } from "./reminders-filtering.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RemindersFilteringService", () => {
  let service: RemindersFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(RemindersFilteringService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
