import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../../core/services/volunteer.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VolunteerRequestItem {
  volunteerUserId: string;
  volunteerTaskId: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  campaignName: string;
  campaignId: string;
  charityName: string;
  charityId: string;
  signupDate: string;
  isActive: boolean;
  status: string;
  volunteerMessage: string;
  availabilityNote: string;
  adminNote: string | null;
  reviewedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

@Component({
  selector: 'volunteer-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class VolunteerDashboard  implements OnInit{
  activeTab: 'applications' | 'tasks' | 'completed' = 'applications';
  selectedStatus = '';
  searchText = '';

  loading = true;
  errorMessage = '';

  requests: VolunteerRequestItem[] = [];

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  constructor(
     private volunteerApplicationService: VolunteerService,
     private toastr: ToastrService
  )
  {

  }

  ngOnInit(): void {
    this.setDefaultStatusForTab();
    this.loadRequests();
  }

    changeTab(tab: 'applications' | 'tasks' | 'completed'): void {
    if (this.activeTab === tab) return;

    this.activeTab = tab;
    this.pageNumber = 1;
    this.searchText = '';
    this.setDefaultStatusForTab();
    this.loadRequests();
  }

    changeStatus(status: string): void {
    if (this.selectedStatus === status) return;

    this.selectedStatus = status;
    this.pageNumber = 1;
    this.loadRequests();
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadRequests();
  }
  clearSearch(): void {
    this.searchText = '';
    this.pageNumber = 1;
    this.loadRequests();
  }

  goToPreviousPage(): void {
    if (this.pageNumber <= 1) return;

    this.pageNumber--;
    this.loadRequests();
  }

   goToNextPage(): void {
    if (this.pageNumber >= this.totalPages) return;

    this.pageNumber++;
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';

    this.volunteerApplicationService.getMyApplicationRequests(
        this.pageNumber,
        this.pageSize,
        this.searchText?.trim() || '',
        this.selectedStatus
      )
      .subscribe({
        next: (res) => {
          this.loading = false;

          if (!res.success) {
            this.errorMessage = res.message || 'Failed to load requests.';
            this.requests = [];
            return;
          }

          this.requests = res.data?.items ?? [];
          this.totalCount = res.data?.totalCount ?? 0;
          this.pageNumber = res.data?.pageNumber ?? 1;
          this.pageSize = res.data?.pageSize ?? 10;
          this.totalPages = res.data?.totalPages ?? 0;
        },
        error: (err) => {
          this.loading = false;
          this.requests = [];
          this.errorMessage =
            err?.error?.message || 'Something went wrong while loading requests.';
        }
      });
  }

cancelApplication(item: VolunteerRequestItem): void {
    if (item.status !== 'Pending') return;

    const confirmed = window.confirm(
      `Are you sure you want to cancel your application for "${item.title}"?`
    );

    if (!confirmed) return;
    else
    {
      this.submitVolunteerAction(item, 'Cancelled');
    }
  }

 startTask(item: VolunteerRequestItem): void {
    if (item.status?.toLowerCase() !== 'approved') return;

    this.submitVolunteerAction(item, 'Started');
  }

  requestCompletion(item: VolunteerRequestItem): void {
    const status = item.status?.toLowerCase();
      if (status !== 'started') {
      this.toastr.error('Only started tasks can request completion.');
      return;
    }

    if (!item.volunteerUserId) {
      this.toastr.error('Invalid request.');
      return;
    }

     const confirmed = confirm('Are you sure you want to request completion?');
     if (!confirmed) return;

    this.submitVolunteerAction(item, 'CompletionRequested');
  }



submitVolunteerAction(
  item: VolunteerRequestItem,
  action: 'Started' | 'Cancelled' | 'CompletionRequested',
  message: string | null = null
): void {
  const payload = {
    volunteerUserId: item.volunteerUserId,
    action,
    message
  };

  this.volunteerApplicationService.volunteerApplicationAction(payload).subscribe({
    next: (res) => {
      if (!res.success) return;

      this.loadRequests();
    }
  });
}

  setDefaultStatusForTab(): void {
    switch (this.activeTab) {
      case 'applications':
        this.selectedStatus = '';
        break;
      case 'tasks':
        this.selectedStatus = '';
        break;
      case 'completed':
        this.selectedStatus = 'Completed';
        break;
      default:
        this.selectedStatus = '';
        break;
    }
  }

  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'pending':
        return 'badge-pending';
      case 'approved':
        return 'badge-approved';
      case 'started':
        return 'badge-started';
      case 'completed':
        return 'badge-completed';
      case 'rejected':
        return 'badge-rejected';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-default';
    }
  }

  getStatusLabel(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'started':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  }

  trackByVolunteerUserId(index: number, item: VolunteerRequestItem): string {
    return item.volunteerUserId;
  }
}
