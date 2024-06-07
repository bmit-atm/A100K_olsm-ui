import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { HttpClientModule } from '@angular/common/http';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
