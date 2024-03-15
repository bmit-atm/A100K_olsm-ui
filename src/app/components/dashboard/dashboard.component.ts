import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '../../services/upload.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import {MatSelectModule} from '@angular/material/select';
import { NgForOf } from '@angular/common';
interface Gruppe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, NgForOf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  gruppen: Gruppe[] = [
    { value: 'OutlookSIGN_ALL', viewValue: 'OutlookSIGN_ALL' },
    { value: 'OutlookSIGN_KV', viewValue: 'OutlookSIGN_KV' },
    { value: 'OutlookSIGN_IT', viewValue: 'OutlookSIGN_IT' },
  ];
  
  genereteForm = new FormGroup({
    gruppe: new FormControl(''),
    url: new FormControl(''),
    file: new FormControl(null),
    name: new FormControl('')
  });

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(private uploadService: UploadService) {}

  onFormSubmit(event: any) {
    
    const gruppe = this.genereteForm.get('gruppe')?.value as string;
    const url = this.genereteForm.get('url')?.value as string;
    const file = this.genereteForm.get('file')?.value as unknown as File;
    const name = this.genereteForm.get('name')?.value as string;
    this.uploadService.uploadImage(gruppe, url, file, name).subscribe(response => {
      saveAs(response, `signature_${name}_${gruppe}.htm`);
      console.log(response);
      console.log(gruppe);

      this.genereteForm.reset();
    }, (error) => {
      console.log(error);
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.genereteForm.patchValue({
        file: file
      });
    }
  }
  
  
}
