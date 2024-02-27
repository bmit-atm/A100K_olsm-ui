import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService{
  constructor(private http: HttpClient) { 
    super();
  }

  uploadImage(username: string, image: File) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('file', image);
  
    return this.http.post(this.getBaseUrl() + 'generate', formData, { responseType: 'blob' });
  }
}
