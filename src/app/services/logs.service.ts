import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Log } from '../models/log';
@Injectable({
  providedIn: 'root'
})
export class LogsService extends BaseService{

  constructor(private http: HttpClient) {
    super();
   }

  getLogs() {
    return this.http.get<Log[]>(this.getBaseUrl() + 'logs');
  }

  deleteLog(id: number) {
    return this.http.delete(this.getBaseUrl() + 'logs/' + id);
  }
}
