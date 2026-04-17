import { Component, inject, OnInit } from '@angular/core';
import { VolunteerService } from '../../../core/services/volunteer.service';
import { ToastrService } from 'ngx-toastr';
import { VolunteerOpportunity } from '../../../shared/models/volunteer/volunteer-opportunity.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'volunteer-opportunities',
  standalone : true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opportunities.html',
  styleUrl: './opportunities.css'
})
export class VolunteerOpportunities implements OnInit{
private volunteerOpportunityService = inject(VolunteerService);
  private toastr = inject(ToastrService);

  opportunities: VolunteerOpportunity[] = [];

  loading = false;
  errorMessage = '';

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  searchText = '';

  ngOnInit(): void {
    this.loadVolunteerOpportunities();
  }

  loadVolunteerOpportunities(): void {
    this.loading = true;
    this.errorMessage = '';

    this.volunteerOpportunityService
      .getVolunteerOpportunities(this.pageNumber, this.pageSize, this.searchText)
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.opportunities = response.data.items;
            this.totalCount = response.data.totalCount;
            this.pageNumber = response.data.pageNumber;
            this.pageSize = response.data.pageSize;
            this.totalPages = response.data.totalPages;
          } else {
            this.opportunities = [];
            this.errorMessage = response.message || 'Failed to load volunteer opportunities.';
          }

          this.loading = false;
        },
        error: (error) => {
          console.error('Volunteer opportunities load failed:', error);
          this.opportunities = [];
          this.errorMessage = 'Something went wrong while loading volunteer opportunities.';
          this.loading = false;
        }
      });
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadVolunteerOpportunities();
  }

  clearSearch(): void {
    this.searchText = '';
    this.pageNumber = 1;
    this.loadVolunteerOpportunities();
  }

  goToPreviousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadVolunteerOpportunities();
    }
  }

  goToNextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadVolunteerOpportunities();
    }
  }

  getStatusLabel(item: VolunteerOpportunity): string {
    if (item.alreadyApplied) return 'Already Applied';
    if (item.isFull) return 'Full';
    return 'Open';
  }

  getStatusClass(item: VolunteerOpportunity): string {
    if (item.alreadyApplied) return 'status-applied';
    if (item.isFull) return 'status-full';
    return 'status-open';
  }

  applyNow(item: VolunteerOpportunity): void {
    if (item.alreadyApplied) {
      this.toastr.warning('You have already applied for this opportunity.', 'Warning');
      return;
    }

    if (item.isFull) {
      this.toastr.error('This opportunity is already full.', 'Unavailable');
      return;
    }

    // placeholder for actual apply API integration
    this.toastr.success(`Application started for "${item.title}".`, 'Volunteer');
    console.log('Apply clicked:', item.volunteerTaskId);
  }

  trackByVolunteerTaskId(index: number, item: VolunteerOpportunity): string {
    return item.volunteerTaskId;
  }
}
