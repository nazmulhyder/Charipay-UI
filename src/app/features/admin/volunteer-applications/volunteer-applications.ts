import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdminVolunteerRequestItem {
  volunteerUserId: string;
  userId: string;
  volunteerName: string;
  volunteerEmail: string;

  volunteerTaskId: string;
  taskTitle: string;
  taskLocation: string;
  taskStartDate: string;
  taskEndDate: string;

  campaignId: string;
  campaignName: string;

  charityId: string;
  charityName: string;

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
  selector: 'app-volunteer-applications',
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer-applications.html',
  styleUrl: './volunteer-applications.css'
})
export class VolunteerApplications  implements OnInit {

   requests: AdminVolunteerRequestItem[] = [];

  loading = false;
  actionLoadingId: string | null = null;
  errorMessage = '';

  searchText = '';
  selectedStatus = '';

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  selectedRequest: AdminVolunteerRequestItem | null = null;
selectedAction: 'approve' | 'reject' | null = null;
adminNote = '';
isSubmittingAction = false;

    constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ){} 

   ngOnInit(): void {
     this.loadRequests();
   }

    loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';

    this.adminService.getVolunteerApplicationRequests(
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
 onSearch(): void {
    this.pageNumber = 1;
    this.loadRequests();
  }

  clearSearch(): void {
    this.searchText = '';
    this.pageNumber = 1;
    this.loadRequests();
  }


  changeStatus(status: string): void {
    if (this.selectedStatus === status) return;

    this.selectedStatus = status;
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

   trackByVolunteerUserId(index: number, item: AdminVolunteerRequestItem): string {
    return item.volunteerUserId;
  }

  openApproveModal(item: AdminVolunteerRequestItem): void {
  this.selectedRequest = item;
  this.selectedAction = 'approve';
  this.adminNote = item.adminNote || '';

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('adminActionModal')
  );
  modal.show();
}

openRejectModal(item: AdminVolunteerRequestItem): void {
  this.selectedRequest = item;
  this.selectedAction = 'reject';
  this.adminNote = item.adminNote || '';

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('adminActionModal')
  );
  modal.show();
}

submitAdminAction(): void {
  if (!this.selectedRequest || !this.selectedAction) return;

  this.isSubmittingAction = true;

  const payload = {
    volunteerUserId: this.selectedRequest.volunteerUserId,
    action: this.selectedAction === 'approve' ? 'Approve' : 'Reject',
    adminNote: this.adminNote
  };

  this.adminService.reviewVolunteerApplications(payload).subscribe({
    next: (res) => {
      this.isSubmittingAction = false;

      if (!res.success) {
        this.toastr.error(res.message || 'Action failed.');
        return;
      }

      this.toastr.success(res.message || 'Request updated successfully.');

      this.closeAdminActionModal();
      this.loadRequests();
    },
    error: () => {
      this.isSubmittingAction = false;
      this.toastr.error('Something went wrong.');
    }
  });
}

closeAdminActionModal(): void {
  const modalEl = document.getElementById('adminActionModal');
  const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
  modal?.hide();

  this.selectedRequest = null;
  this.selectedAction = null;
  this.adminNote = '';
}
}
