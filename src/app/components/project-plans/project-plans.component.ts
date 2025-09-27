import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-project-plans',
  standalone: true,
  imports: [],
  templateUrl: './project-plans.component.html',
  styleUrl: './project-plans.component.css'
})
export class ProjectPlansComponent {
  constructor(private dialog: MatDialog) {}

  openEnquiryForm() {
    this.dialog.open(LeadDialogComponent, {
      width: '600px',
      panelClass: 'visit-dialog',
      data: { plotId: 'overview' }
    });
  }

  openLeadDialog() {
    this.dialog.open(LeadDialogComponent, {
      width: '600px',
      panelClass: 'visit-dialog',
      data: { source: 'plans' }
    });
  }
}
