// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// // Model for lead info
// export interface Lead {
//   name: string;
//   email: string;
//   phone: string;
//   otp?: string; // optional until verified
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LeadService {

//   private apiUrl = 'http://localhost:8080/api/leads'; // 🔹 Update with your backend URL

//   constructor(private http: HttpClient) {}

//   /**
//    * Send OTP to user phone
//    */
//   sendOtp(phone: string): Observable<any> {
//     const params = new HttpParams().set('phone', phone);
//     return this.http.post(`${this.apiUrl}/send-otp`, {}, { params });
//   }

//   /**
//    * Verify OTP provided by user
//    */
//   verifyOtp(phone: string, otp: string): Observable<any> {
//     const params = new HttpParams()
//       .set('phone', phone)
//       .set('otp', otp);
//     return this.http.post(`${this.apiUrl}/verify-otp`, {}, { params });
//   }

//   /**
//    * Save lead details (after OTP verified)
//    */
//   saveLead(lead: Lead): Observable<Lead> {
//     return this.http.post<Lead>(`${this.apiUrl}`, lead);
//   }
// }