import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private dialog: MatDialog) {}
  
  openLead() { 
    this.dialog.open(LeadDialogComponent, { 
      width: '600px',
      panelClass: 'visit-dialog',
      data: { plotId: 'hero' }
    }); 
  }

  downloadBrochure() {
    const link = document.createElement('a');
    link.href = '/assets/lansum-encanto-brochure.pdf';
    link.download = 'Lansum-Encanto-Brochure.pdf';
    link.click();
  }
}