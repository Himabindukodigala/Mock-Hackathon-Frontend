import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class Lookup { baseUrl = 'https://localhost:5001/api/shared';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getStatuses() {
    return this.http.get<Status[]>(`${this.baseUrl}/statuses`);
  }}
