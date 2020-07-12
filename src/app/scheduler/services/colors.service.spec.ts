import { TestBed } from "@angular/core/testing";

import { ColorsService } from "./colors.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ColorsService", () => {
  let service: ColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ColorsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
