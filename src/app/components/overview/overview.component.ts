// src/app/components/overview/overview.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  constructor(private dialog: MatDialog) {}

  openEnquiryForm() {
    this.dialog.open(LeadDialogComponent, {
      width: '600px',
      panelClass: 'visit-dialog',
      data: { plotId: 'overview' }
    });
  }
}