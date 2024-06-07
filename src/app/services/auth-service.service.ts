import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient) { 
    super();
  }
  baseUrl = 'http://localhost:8000/';
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', credentials).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token);
      })
    );
  }

  getAllGroups(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.getBaseUrl() + 'all-groups', { headers: headers });
}

  getUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}
