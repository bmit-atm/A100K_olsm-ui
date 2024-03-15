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

  uploadImage(gruppe: string, url:string, image: File, name: string) {
    const formData = new FormData();
    formData.append('gruppe', gruppe);
    formData.append('url', url);
    formData.append('name', name);
    formData.append('file', image);
  
    return this.http.post(this.getBaseUrl() + 'generate', formData, { responseType: 'blob' });
  }
}
