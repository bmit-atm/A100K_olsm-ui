import { TestBed } from '@angular/core/testing';

import { LoginGuardService } from './login-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('LoginGuardService', () => {
  let service: LoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHelperService]
    });
    service = TestBed.inject(LoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
