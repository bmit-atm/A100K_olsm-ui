import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '../../services/upload.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import {MatSelectModule} from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { SnackbarService } from '../../services/snackbar.service';

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
  isSubmitted: boolean = false;
  genereteForm = new FormGroup({
    gruppe: new FormControl([], Validators.required),
    url: new FormControl('', Validators.required),
    file: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required)
  });

  previewUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(private uploadService: UploadService, private authService: AuthService, private snackbarService: SnackbarService) {}

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
       // Speichern Sie die ZIP-Datei
      const blob = new Blob([response], { type: 'application/zip' });
      saveAs(blob, `signature_${name}_${gruppeString}.zip`);

      
      
      // Formular zurücksetzen
      this.genereteForm.reset();
      this.previewUrl = null;
      this.fileUpload.nativeElement.value = '';
      this.isSubmitted = true;
      // Validierungsfehler zurücksetzen für alle Formularfelder
      Object.keys(this.genereteForm.controls).forEach(key => {
        this.genereteForm.get(key)?.setErrors(null);
      });

      // Erfolgsmeldung anzeigen
      this.snackbarService.openSnackBar({
        text: 'Signature wurde erfolgreich generiert!',
        color: 'success',
      });
    }, (error) => {
      this.snackbarService.openSnackBar({
        text: 'Fehler beim Generieren von Signature!',
        color: 'error',
      });
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.genereteForm.patchValue({
        file: file
      });

      // Datentyp des files überprüfen
      if (!file.type.includes('image')) {
        this.snackbarService.openSnackBar({
          text: 'Nur Bilder sind erlaubt!',
          color: 'error',
        });
        this.fileUpload.nativeElement.value = '';
        return;
      }else{
        // Vorschau des ausgewählten Bildes anzeigen
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
      
    }
  }
  

  getAllGroups() {
    this.authService.getAllGroups().subscribe(response => {
      this.gruppen = response.map((group: any[]) => ({ value: group[0], viewValue: group[0] }));
    });

  }
  
}
