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
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  
  genereteForm = new FormGroup({
    username: new FormControl(''),
    file: new FormControl(null)
  });
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(private uploadService: UploadService) {}

  onFormSubmit(event: any) {
    event.preventDefault();
    const username = this.genereteForm.get('username')?.value as string;
    const file = this.genereteForm.get('file')?.value as unknown as File;

    this.uploadService.uploadImage(username, file).subscribe(response => {
      saveAs(response, 'signature.htm');
    }, (error) => {
      console.log(error);
    });

    console.log(file, username);
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
