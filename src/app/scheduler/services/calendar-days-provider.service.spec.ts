import { TestBed } from "@angular/core/testing";

import { CalendarDaysProviderService } from "./calendar-days-provider.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CalendarDaysProviderService", () => {
  let service: CalendarDaysProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalendarDaysProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
