import { Injectable } from '@angular/core';
import { Staff } from '../models/staff.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Ticket {baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  // Tenant
  createTicket(formData: FormData) {
    return this.http.post(`${this.baseUrl}/tenant/tickets`, formData);
  }

  getMyTickets() {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tenant/tickets`);
  }

  getTicketHistory(id: string) {
    return this.http.get(`${this.baseUrl}/shared/tickets/${id}/history`);
  }

  // Manager
  getAllTickets() {
    return this.http.get<Ticket[]>(`${this.baseUrl}/manager/tickets`);
  }

  assignTicket(ticketId: string, staffId: string) {
    return this.http.patch(`${this.baseUrl}/manager/tickets/${ticketId}/assign`, {
      staffId
    });
  }

  updateStatus(ticketId: string, statusId: number) {
    return this.http.patch(`${this.baseUrl}/manager/tickets/${ticketId}/status`, {
      statusId
    });
  }

  getStaff() {
    return this.http.get<Staff[]>(`${this.baseUrl}/manager/staff`);
  }

  // Staff
  getAssignedTickets() {
    return this.http.get<Ticket[]>(`${this.baseUrl}/staff/tickets`);
  }

  staffUpdateStatus(ticketId: string, statusId: number) {
    return this.http.patch(`${this.baseUrl}/staff/tickets/${ticketId}/status`, {
      statusId
    });
  }}
