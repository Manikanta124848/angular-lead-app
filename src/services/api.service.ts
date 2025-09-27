import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.apiBase;
  constructor(private http: HttpClient) {}
  scheduleVisit(body: { name: string; email: string; date: Date; phone: string; message?: string }) {
    return this.http.post(`${this.base}/visits`, body);
  }
}