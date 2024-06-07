import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
