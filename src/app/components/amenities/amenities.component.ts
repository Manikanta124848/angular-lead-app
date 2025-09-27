// src/app/components/amenities/amenities.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent {
  constructor(private dialog: MatDialog) {}

  openLeadDialog() {
    this.dialog.open(LeadDialogComponent, {
      width: '600px',
      panelClass: 'visit-dialog',
      data: { source: 'amenities' }
    });
  }
}