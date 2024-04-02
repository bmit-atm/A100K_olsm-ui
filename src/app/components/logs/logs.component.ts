import { Component } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { Log } from '../../models/log';
import { DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DatePipe, MatIconModule, MatButtonModule, NgIf],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.sass'
})
export class LogsComponent {
  logs: Log[] = [];
  constructor(private logsService: LogsService, private snackbarService: SnackbarService) { }

  // DataSources for the logs table
  displayedColumns: string[] = ['user', 'gruppe', 'name', 'bild', 'created_at', 'delete'];
  ngOnInit(): void {
    this.getLogs();
  }


  getLogs() {
    this.logsService.getLogs().subscribe((data: Log[]) => {
      this.logs = data;
      this.snackbarService.openSnackBar({
        text: 'Logs erfolgreich geladen!',
        color: 'success',
      });
    },(error) => {
      this.snackbarService.openSnackBar({
        text: 'Fehler beim Laden der Logs!',
        color: 'error',
        });
  });
}

deleteLog(id: number) {
  this.logsService.deleteLog(id).subscribe(
    (response) => {
      this.getLogs();
      this.snackbarService.openSnackBar({
        text: 'Log erfolgreich gelöscht!',
        color: 'success',
      });
    },
    error => {
      this.snackbarService.openSnackBar({
        text: 'Fehler beim Löschen des Logs!',
        color: 'error',
      });
    }
  )};
}
