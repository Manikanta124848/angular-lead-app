// src/app/components/navbar/navbar.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { LeadDialogComponent } from '../lead-dialog/lead-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isMobileNavOpen = false;
  isMobileView = false;
  private isDialogOpen = false;

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav() {
    this.isMobileNavOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  isScrolled = false;

  constructor(private dialog: MatDialog) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  openLeadDialog() {
    if (this.isDialogOpen) {
      return;
    }
    
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(LeadDialogComponent, { 
      maxWidth: '90vw',
      width: '600px',
      panelClass: ['visit-dialog', 'custom-dialog-container'],
      disableClose: true,
      autoFocus: true,
      hasBackdrop: true,
      backdropClass: ['dialog-backdrop', 'custom-backdrop'],
      position: { top: '70px' },
      data: { plotId: 'promo', plotTitle: 'Lansum Encanto' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      // Close mobile menu first if open
      if (this.isMobileNavOpen) {
        this.closeMobileNav();
      }
      // Small delay to ensure menu is closed
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }

handleWhatsAppClick(event: MouseEvent) {
  const phoneNumber = '919000881133';
  const message = "Hi! I'm interested in Lansum Encanto. I would like to know more details about the project and schedule a site visit.";
  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    setTimeout(() => {
      window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }, 400);
  } else {
    // On desktop
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  }

  event.preventDefault();
}

}