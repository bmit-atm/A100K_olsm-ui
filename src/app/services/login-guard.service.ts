import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }

  canActivate() {
    const token = localStorage.getItem('access_token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
