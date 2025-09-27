import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lead-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent {
  visitForm: FormGroup;
  isDatepickerOpen = false;
  googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwXgzIfZZ9mOQxvsL2vrVVedkyWMLQtoX-OAQJhKm4ZQHWWz3dilOAzEFMxdeh0R0hA/exec';
  
  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    const dialogContainer = document.querySelector('.dialog-container');
    const target = event.target as Element;   

    // Close if clicking outside dialog and not on datepicker
    if (dialogContainer && !dialogContainer.contains(target)) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape() {
    this.closeModal();
  }  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LeadDialogComponent>,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private http: HttpClient
  ) {
    this.visitForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['']
    });
  }

      // base = environment.apiBase;
      // scheduleVisit(body: { name: string; email: string; date: Date; phone: string; message?: string }) {
      //   return this.http.post(`${this.base}/visits`, body);
      // }

  closeModal(): void {
    this.dialogRef.close();
  }

  // async submitForm() {
  //   if (this.visitForm.valid) {
  //     try {
  //       await this.api.scheduleVisit(this.visitForm.value).toPromise();
  //       this.snackBar.open('Visit scheduled successfully!', 'Close', {
  //         duration: 5000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'bottom'
  //       });
  //       this.dialogRef.close(true);
  //     } catch (error) {
  //       this.snackBar.open('Failed to schedule visit. Please try again.', 'Close', {
  //         duration: 5000
  //       });
  //     }
  //   } else {
  //     this.visitForm.markAllAsTouched();
  //   }
  // }

  //  submitForm() {
  //   if (this.visitForm.valid) {
  //     this.http.post(this.googleScriptUrl, this.visitForm.value).subscribe({
  //       next: () => {
  //         this.snackBar.open('Visit scheduled successfully!', 'Close', {
  //           duration: 5000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //         this.dialogRef.close(true);
  //       },
  //       error: () => {
  //         this.snackBar.open('Failed to schedule visit. Please try again.', 'Close', {
  //           duration: 5000
  //         });
  //       }
  //     });
  //   } else {
  //     this.visitForm.markAllAsTouched();
  //   }
  // }

//   submitForm() {
//   if (this.visitForm.valid) {
//     const params = new URLSearchParams(this.visitForm.value).toString();
//     this.http.get(`${this.googleScriptUrl}?${params}`).subscribe({
//       next: () => {
//         this.snackBar.open('Visit scheduled successfully!', 'Close', { duration: 5000 });
//         this.dialogRef.close(true);
//       },
//       error: () => {
//         this.snackBar.open('Failed to schedule visit. Please try again.', 'Close', { duration: 5000 });
//       }
//     });
//   } else {
//     this.visitForm.markAllAsTouched();
//   }
// }

// submitForm() {
//   if (this.visitForm.valid) {
//     const params = new URLSearchParams(this.visitForm.value).toString();
//     this.http.jsonp(`${this.googleScriptUrl}?${params}`, 'callback').subscribe({
//       next: () => {
//         alert('Visit scheduled successfully!');
//         this.dialogRef.close(true);
//       },
//       error: () => {
//         alert('Failed to schedule visit. Please try again.');
//       }
//     });
//   } else {
//     this.visitForm.markAllAsTouched();
//   }
// }

submitForm() {
  if (this.visitForm.valid) {
    this.http.post('/.netlify/functions/saveLead', this.visitForm.value).subscribe({
      next: () => {
        // this.snackBar.open('Visit scheduled successfully!', 'Close', { duration: 5000 });
        alert('Visit scheduled successfully!');
        this.dialogRef.close(true);
      },
      error: () => {
        console.error('Failed to schedule visit. Please try again.');
        alert('Failed to schedule visit. Please try again.');
        // this.snackBar.open('Failed to schedule visit. Please try again.', 'Close', { duration: 5000 });
      }
    });
  } else {
    this.visitForm.markAllAsTouched();
  }
}




}