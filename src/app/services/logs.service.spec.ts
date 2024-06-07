import { TestBed } from '@angular/core/testing';

import { LogsService } from './logs.service';
import { HttpClientModule } from '@angular/common/http';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(LogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
