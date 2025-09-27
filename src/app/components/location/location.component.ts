// src/app/components/location/location.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  constructor(private dialog: MatDialog) {}

  openLocationModal() {
    this.dialog.open(LeadDialogComponent, {
      width: '600px',
      panelClass: 'visit-dialog',
      data: { 
        plotId: 'location',
        type: 'directions'
      }
    });
  }
}