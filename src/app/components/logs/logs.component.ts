import { Component } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { Log } from '../../models/log';
import { DatePipe } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DatePipe],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.sass'
})
export class LogsComponent {
  logs: Log[] = [];
  constructor(private logsService: LogsService, private sanitizer: DomSanitizer) { }

  // DataSources for the logs table
  displayedColumns: string[] = ['gruppe', 'name', 'bild', 'created_at'];
  ngOnInit(): void {
    this.getLogs();
  }


  getLogs() {
    this.logsService.getLogs().subscribe((data: Log[]) => {
      this.logs = data;

    });
  }

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
