import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    private http: HttpClient
  ) {
    this.visitForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['']
    });
  }



  closeModal(): void {
    this.dialogRef.close();
  } 
submitForm() {
  if (this.visitForm.valid) {
    this.http.post('/.netlify/functions/saveLead', this.visitForm.value).subscribe({
      next: () => {
        alert('Visit scheduled successfully!');
        this.dialogRef.close(true);
      },
      error: () => {
        alert('Failed to schedule visit. Please try again.');
      }
    });
  } else {
    this.visitForm.markAllAsTouched();
  }
}




}