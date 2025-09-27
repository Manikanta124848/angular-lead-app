// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
   currentYear = new Date().getFullYear(); 
  constructor(private dialog: MatDialog) {}
  openLead() { 
    this.dialog.open(LeadDialogComponent, { 
      width: '600px',
      panelClass: 'visit-dialog',
      data: { plotId: 'footer' }
    }); 
  }
}