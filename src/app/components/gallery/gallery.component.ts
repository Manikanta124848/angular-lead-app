import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  galleryItems = [
    {
      url: '/assets/gallery1.jpg',
      title: 'Luxury Living Spaces',
      description: 'Meticulously designed floor plans that optimize space and comfort'
    },
    {
      url: '/assets/gallery2.jpg',
      title: 'Modern Architecture',
      description: 'Contemporary design meets timeless elegance'
    },
    {
      url: '/assets/gallery3.jpg',
      title: 'Premium Finishes',
      description: 'High-end materials and superior craftsmanship throughout'
    },
    {
      url: '/assets/gallery4.jpg',
      title: 'Project Overview',
      description: 'A glimpse into the magnificent Lansum Encanto development'
    },
    {
      url: '/assets/gallery5.jpg',
      title: 'Exterior Excellence',
      description: 'Stunning architectural features that define luxury living'
    },
     {
      url: '/assets/gallery6.jpg',
      title: 'Luxury Living Spaces',
      description: 'Meticulously designed floor plans that optimize space and comfort'
    },
    {
      url: '/assets/gallery7.jpg',
      title: 'Modern Architecture',
      description: 'Contemporary design meets timeless elegance'
    },
    {
      url: '/assets/gallery8.jpg',
      title: 'Premium Finishes',
      description: 'High-end materials and superior craftsmanship throughout'
    },
    {
      url: '/assets/gallery9.jpg',
      title: 'Project Overview',
      description: 'A glimpse into the magnificent Lansum Encanto development'
    },
    {
      url: '/assets/gallery10.jpg',
      title: 'Exterior Excellence',
      description: 'Stunning architectural features that define luxury living'
    }
  ];

  currentIndex = 0;
  previousIndex = this.galleryItems.length - 1;
  private animationFrameId: number | null = null;
  private lastFrameTime = 0;
  private readonly SLIDE_INTERVAL = 4000;
  private imagesLoaded = new Set<string>();
  private isTransitioning = false;

  constructor(private ngZone: NgZone) { }

  getPreviousIndex(): number {
    return (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
  }

  getNextIndex(): number {
    return (this.currentIndex + 1) % this.galleryItems.length;
  }

  ngOnInit(): void {
    // Preload the first image and start slideshow only when it's ready
    this.preloadImage(this.galleryItems[0].url).then(() => {
      // Start the slideshow outside Angular's zone for better performance
      this.ngZone.runOutsideAngular(() => {
        this.startAutoSlide();
      });
      // Preload the next image
      this.preloadNextImage();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  nextImage(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
      this.preloadNextImage();
      this.resetAutoSlide();
      this.isTransitioning = false;
    }, 50);
  }

  previousImage(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
      this.preloadNextImage();
      this.resetAutoSlide();
      this.isTransitioning = false;
    }, 50);
  }

  goToImage(index: number): void {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;
    
    setTimeout(() => {
      this.currentIndex = index;
      this.preloadNextImage();
      this.resetAutoSlide();
      this.isTransitioning = false;
    }, 50);
  }

  private async preloadImage(url: string): Promise<void> {
    if (this.imagesLoaded.has(url)) return;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.imagesLoaded.add(url);
        resolve();
      };
      img.src = url;
    });
  }

  private preloadNextImage(): void {
    const nextIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.preloadImage(this.galleryItems[nextIndex].url);
  }

  private startAutoSlide(): void {
    const animate = (timestamp: number) => {
      if (!this.lastFrameTime) this.lastFrameTime = timestamp;
      
      const elapsed = timestamp - this.lastFrameTime;
      
      if (elapsed >= this.SLIDE_INTERVAL) {
        // Run state updates inside Angular's zone
        this.ngZone.run(() => {
          this.nextImage();
        });
        this.lastFrameTime = timestamp;
      }
      
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopAutoSlide(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      this.lastFrameTime = 0;
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    // Start the slideshow outside Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.startAutoSlide();
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error(`Failed to load image: ${img.src}`);
    img.src = '/assets/sample.jpg';
  }
}
