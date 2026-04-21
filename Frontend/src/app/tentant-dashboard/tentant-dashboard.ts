import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';
import { Ticket } from '../services/ticket';
import { Lookup } from '../services/lookup';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tentant-dashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './tentant-dashboard.html',
  styleUrl: './tentant-dashboard.css',
})
export class TentantDashboard implements OnInit {

  userName: string = '';
  apartmentNumber: string = '';

  categories: Category[] = [];
  statuses: Status[] = [];
  tickets: any[] = [];

  selectedFile: File | null = null;

  newTicket = {
    categoryId: '',
    description: ''
  };

  constructor(
    private ticketService: Ticket,
    private lookupService: Lookup,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadCategories();
    this.loadStatuses();
    this.loadTickets();
  }

  //  Load logged-in user
  loadUser() {
    const user = this.authService.getCurrentUser();

    this.userName = user?.fullName;
    this.apartmentNumber = user?.apartmentNumber;
  }

  

  // 📊 Load statuses from backend
  loadStatuses() {
    this.lookupService.getStatuses().subscribe({
      next: (res) => this.statuses = res,
      error: () => alert('Failed to load statuses')
    });
  }

  // 📄 Load tenant tickets
  loadTickets() {
    this.ticketService.getMyTickets().subscribe({
      next: (res) => this.tickets = res,
      error: () => alert('Failed to load tickets')
    });
  }

  //  File upload (local system)
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  //  Submit ticket
  submitTicket() {

    if (!this.newTicket.categoryId || !this.newTicket.description) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', this.newTicket.categoryId);
    formData.append('description', this.newTicket.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.ticketService.createTicket(formData).subscribe({
      next: () => {
        alert('Ticket submitted successfully');

        this.newTicket = { categoryId: '', description: '' };
        this.selectedFile = null;

        this.loadTickets();
      },
      error: () => alert('Error submitting ticket')
    });
  }

  //  Convert statusId → name
  getStatusName(statusId: number): string {
    return this.statuses.find(s => s.id === statusId)?.name || 'Unknown';
  }

  // Badge color
  getStatusClass(statusId: number): string {
    const status = this.getStatusName(statusId);

    switch (status) {
      case 'Pending': return 'bg-warning';
      case 'InProgress': return 'bg-info';
      case 'Completed': return 'bg-success';
      default: return 'bg-secondary';
    }
  }}
