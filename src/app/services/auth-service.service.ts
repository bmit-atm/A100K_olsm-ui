import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends BaseService {

  constructor(private http: HttpClient) { 
    super();
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8000/login', credentials);
  }
}
