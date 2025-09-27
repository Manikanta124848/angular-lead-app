// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { LocationComponent } from './components/location/location.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeadDialogComponent } from './components/lead-dialog/lead-dialog.component';
import { ProjectPlansComponent } from './components/project-plans/project-plans.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    OverviewComponent,
    AmenitiesComponent,
    LocationComponent,
    FooterComponent,
    LeadDialogComponent,
    ProjectPlansComponent,
    GalleryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }