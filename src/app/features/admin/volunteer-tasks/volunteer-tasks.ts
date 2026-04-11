import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampaignService } from '../../../core/services/campaign.service';
import { VolunteerService } from '../../../core/services/volunteer.service';
import { AdminService } from '../../../core/services/admin.service';


interface CampaignDropdownItem {
  campaignId: string;
  name: string;
}

interface VolunteerTaskItem {
  volunteerTaskId: string;
  campaignId: string;
  campaignName: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  maxVolunteer: number;
  isActive: boolean;
}


@Component({
  selector: 'app-volunteer-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './volunteer-tasks.html',
  styleUrl: './volunteer-tasks.css'
})


export class VolunteerTasks implements OnInit{
 volunteerTaskForm!: FormGroup;

  campaigns: CampaignDropdownItem[] = [];
  volunteerTasks: VolunteerTaskItem[] = [];

  isEditMode = false;
  selectedTaskId: string | null = null;

  isSubmitting = false;
  isLoadingTasks = false;
  isLoadingCampaigns = false;

  private readonly fb = inject(FormBuilder);
  private readonly volunteerTaskService = inject(VolunteerService);
  
  ngOnInit(): void {
    this.initializeForm();
    this.loadCampaigns();
    this.loadVolunteerTasks();
  }

  constructor(private campaignService :CampaignService, private adminService: AdminService)
  {

  }

  private initializeForm(): void {
    this.volunteerTaskForm = this.fb.group({
      campaignId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxVolunteer: [1, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });
  }

  loadCampaigns(): void {
    this.isLoadingCampaigns = true;

    // this.campaignService.getAllCampaigns()
    //   .pipe(finalize(() => (this.isLoadingCampaigns = false)))
    //   .subscribe({
    //     next: (response) => {
    //       this.campaigns = response?.data ?? response ?? [];
    //     },
    //     error: (error) => {
    //       console.error('Failed to load campaigns:', error);
    //     }
    //   });
  }

  loadVolunteerTasks(): void {
    this.isLoadingTasks = true;

    // this.volunteerTaskService.getAllVolunteerTasks()
    //   .pipe(finalize(() => (this.isLoadingTasks = false)))
    //   .subscribe({
    //     next: (response) => {
    //       this.volunteerTasks = response?.data ?? response ?? [];
    //     },
    //     error: (error) => {
    //       console.error('Failed to load volunteer tasks:', error);
    //     }
    //   });
  }

  onSubmit(): void {
    if (this.volunteerTaskForm.invalid) {
      this.volunteerTaskForm.markAllAsTouched();
      return;
    }

    if (!this.isValidDateRange()) {
      alert('End date must be later than start date.');
      return;
    }

    const payload = this.buildPayload();
    this.isSubmitting = true;

    // if (this.isEditMode && this.selectedTaskId) {
    //   this.volunteerTaskService.updateVolunteerTask(this.selectedTaskId, payload)
    //     .pipe(finalize(() => (this.isSubmitting = false)))
    //     .subscribe({
    //       next: () => {
    //         alert('Volunteer task updated successfully.');
    //         this.resetForm();
    //         this.loadVolunteerTasks();
    //       },
    //       error: (error) => {
    //         console.error('Failed to update volunteer task:', error);
    //       }
    //     });
    // } else {
    //   this.volunteerTaskService.createVolunteerTask(payload)
    //     .pipe(finalize(() => (this.isSubmitting = false)))
    //     .subscribe({
    //       next: () => {
    //         alert('Volunteer task created successfully.');
    //         this.resetForm();
    //         this.loadVolunteerTasks();
    //       },
    //       error: (error) => {
    //         console.error('Failed to create volunteer task:', error);
    //       }
    //     });
    // }
  }

  editTask(task: VolunteerTaskItem): void {
    this.isEditMode = true;
    this.selectedTaskId = task.volunteerTaskId;

    this.volunteerTaskForm.patchValue({
      campaignId: task.campaignId,
      title: task.title,
      description: task.description,
      location: task.location,
      startDate: this.toDateTimeLocal(task.startDate),
      endDate: this.toDateTimeLocal(task.endDate),
      maxVolunteer: task.maxVolunteer,
      isActive: task.isActive
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleStatus(task: VolunteerTaskItem): void {
    const updatedPayload = {
      campaignId: task.campaignId,
      title: task.title,
      description: task.description,
      location: task.location,
      startDate: task.startDate,
      endDate: task.endDate,
      maxVolunteer: task.maxVolunteer,
      isActive: !task.isActive
    };

    // this.volunteerTaskService.updateVolunteerTask(task.volunteerTaskId, updatedPayload)
    //   .subscribe({
    //     next: () => {
    //       task.isActive = !task.isActive;
    //     },
    //     error: (error) => {
    //       console.error('Failed to toggle task status:', error);
    //     }
    //   });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedTaskId = null;

    this.volunteerTaskForm.reset({
      campaignId: '',
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      maxVolunteer: 1,
      isActive: true
    });
  }

  private buildPayload(): object {
    const formValue = this.volunteerTaskForm.value;

    return {
      campaignId: formValue.campaignId,
      title: formValue.title?.trim(),
      description: formValue.description?.trim(),
      location: formValue.location?.trim(),
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      maxVolunteer: Number(formValue.maxVolunteer),
      isActive: formValue.isActive
    };
  }

  private isValidDateRange(): boolean {
    const start = new Date(this.volunteerTaskForm.get('startDate')?.value);
    const end = new Date(this.volunteerTaskForm.get('endDate')?.value);

    return end > start;
  }

  private toDateTimeLocal(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  get f() {
    return this.volunteerTaskForm.controls;
  }
}
