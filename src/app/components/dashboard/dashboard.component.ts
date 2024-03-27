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
import { NgForOf, NgIf } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
interface Gruppe {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, NgForOf, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  gruppen: Gruppe[] = [
    
  ];
  user: string = '';
  
  genereteForm = new FormGroup({
    gruppe: new FormControl([]),
    url: new FormControl(''),
    file: new FormControl(null),
    name: new FormControl('')
  });

  previewUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(private uploadService: UploadService, private authService: AuthServiceService) {}

  ngOnInit() {
    this.getAllGroups();
    this.user = this.authService.getUser();
  }
  onFormSubmit(event: any) {
    
    const gruppe = this.genereteForm.get('gruppe')?.value as [];
    const url = this.genereteForm.get('url')?.value as string;
    const file = this.genereteForm.get('file')?.value as unknown as File;
    const name = this.genereteForm.get('name')?.value as string;
    console.log(gruppe);
    this.uploadService.uploadImage(this.user, gruppe, url, file, name).subscribe(response => {
      const gruppeString = gruppe.join(','); // Hier werden die Gruppennamen durch Unterstriche getrennt
      saveAs(response, `signature_${name}_${gruppeString}.htm`);
      console.log(response);
      console.log(gruppe);
      console.log(this.user);
      this.genereteForm.reset();
    }, (error) => {
      console.log(error);
      console.log(gruppe);
      console.log(url);
      console.log(file);
      console.log(name);
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.genereteForm.patchValue({
        file: file
      });

      // Vorschau des ausgewählten Bildes anzeigen
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  getAllGroups() {
    this.authService.getAllGroups().subscribe(response => {
      this.gruppen = response.map((group: any[]) => ({ value: group[0], viewValue: group[0] }));
    });

  }
  
}
