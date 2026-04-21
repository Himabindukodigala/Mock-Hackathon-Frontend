import { Component, OnInit } from '@angular/core';
import { Ticket } from '../services/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboard implements OnInit {

  tickets: any[] = [];
  staffList: any[] = [];

  constructor(private service: Ticket) {}

  ngOnInit() {
    this.loadTickets();
    this.loadStaff();
  }

  loadTickets() {
    this.service.getAllTickets().subscribe((res: any) => {
      this.tickets = res;
    });
  }

  loadStaff() {
    this.service.getStaff().subscribe((res: any) => {
      this.staffList = res;
    });
  }

  assign(ticket: any) {
    const body = {
      ticketId: ticket.id,
      staffId: ticket.selectedStaff
    };

    this.service.assignTicket(body.ticketId, body.staffId).subscribe(() => {
      alert("Assigned");
      this.loadTickets();
    });
  }}
