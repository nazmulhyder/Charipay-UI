import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampaignService } from '../../../core/services/campaign.service';
import { VolunteerService } from '../../../core/services/volunteer.service';
import { AdminService } from '../../../core/services/admin.service';
import { CharityService } from '../../../core/services/charity.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../../shared/custom/toast-service';
import { ToastrService } from 'ngx-toastr';


interface CharityItem {
  charityId : string,
  name : string
}

interface CampaignItem {
  campaignId: string;
  campaignName: string;
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
  charityId : string,
  charityName:string
}


@Component({
  selector: 'app-volunteer-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './volunteer-tasks.html',
  styleUrl: './volunteer-tasks.css'
})


export class VolunteerTasks implements OnInit{
 volunteerTaskForm!: FormGroup;
  campaigns: CampaignItem[] = [];
  charities: CharityItem[] = [];
  volunteerTasks: VolunteerTaskItem[] = [];
  selectedCharityId:string | null = null;
  selectedTaskId : string | null = null;

  isEditMode = false;
  isSubmitting = false;
  loading = false;

  searchTerm = '';
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;


  private readonly fb = inject(FormBuilder);
  private readonly charityService = inject(CharityService);
  private readonly campaignService = inject(CampaignService);
  private readonly volunteerTaskService = inject(VolunteerService);
  private readonly toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.initializeForm();
    this.loadCharities();
    this.loadVolunteerTasks();
  }


  private initializeForm(): void {
    this.volunteerTaskForm = this.fb.group({
      charityId: [''],
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

loadCharities(): void {
    this.charityService.getLookupCharity?.() // if exists
      ?.pipe?.(finalize(() => {}))
      ?.subscribe?.({
        next: (response: any) => {
          this.charities = response?.data ?? response?.items ?? response ?? [];
          console.log('charities', this.charities);
        },
        error: (error: any) => {
         // console.error('Failed to load charities:', error);
         this.toastr.error('Failed to load charities!', 'Error')
        }
      });
  }

  onCharityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const charityId = selectElement.value || null;

    this.selectedCharityId = charityId;
    this.volunteerTaskForm.patchValue({ campaignId: '' });
    this.campaigns = [];

    if (charityId) {
      this.loadCampaignsByCharity(charityId);
    }
  }

    loadCampaignsByCharity(charityId: string): void {
    this.campaignService.getLookupCampaignByCharity?.(charityId)
      ?.subscribe?.({
        next: (response: any) => {
          this.campaigns = response?.data ?? response ?? [];
        },
        error: (error: any) => {
          //console.error('Failed to load campaigns by charity:', error);
           this.toastr.error('Failed to load campaigns by charity!', 'Error')
        }
      });
    }


 loadVolunteerTasks(): void {
    this.loading = true;

    this.volunteerTaskService.getAllVolunteerTaskLists?.(this.pageNumber, this.pageSize, this.searchTerm)
      ?.pipe?.(finalize(() => (this.loading = false)))
      ?.subscribe?.({
        next: (response: any) => {
          this.volunteerTasks = response?.data?.items ?? response?.items ?? response?.data ?? response ?? [];
          this.totalCount = response?.data?.totalCount ?? response?.totalCount ?? this.volunteerTasks.length;
        },
        error: (error: any) => {
          //console.error('Failed to load volunteer tasks:', error);
           this.toastr.error('Failed to load volunteer tasks!', 'Error')
        }
      });
    }

  onSubmit(): void {
    if (this.volunteerTaskForm.invalid) {
      this.volunteerTaskForm.markAllAsTouched();
      return;
    }

    if (!this.isValidDateRange()) {
      //alert('End date must be later than start date.');
       this.toastr.warning('End date must be later than start date!', 'Warning')
      return;
    }

    const payload = this.buildPayload();
    this.isSubmitting = true;

    // if (this.isEditMode && this.selectedTaskId) {
    //   this.volunteerTaskService.updateVolunteerTask(payload)
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
      this.volunteerTaskService.createVolunteerTask(payload)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: () => {
            //alert('Volunteer task created successfully.');
             this.toastr.success('Volunteer task created successfully', 'Success')
            this.resetForm();
            this.loadVolunteerTasks();
          },
          error: (error) => {
            //console.error('Failed to create volunteer task:', error);
            this.toastr.error('Failed to create volunteer task!', 'Error')
          }
        });
    //}
  }

 onEdit(task: VolunteerTaskItem): void {
    this.isEditMode = true;
    this.selectedTaskId = task.volunteerTaskId;

    this.selectedCharityId = task.charityId ?? null;

    if (this.selectedCharityId) {
      this.loadCampaignsByCharity(this.selectedCharityId);
    }

    this.volunteerTaskForm.patchValue({
      charityId: task.charityId ?? '',
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
    const payload = {
      campaignId: task.campaignId,
      title: task.title,
      description: task.description,
      location: task.location,
      startDate: task.startDate,
      endDate: task.endDate,
      maxVolunteer: task.maxVolunteer,
      isActive: !task.isActive
    };

    this.volunteerTaskService.updateVolunteerTask?.(payload)
      ?.subscribe?.({
        next: () => {
          task.isActive = !task.isActive;
        },
        error: (error: any) => {
          console.error('Failed to toggle task status:', error);
          this.toastr.error('Failed to toggle task status!', 'Error')
        }
      });
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



 onSearch(): void {
    this.pageNumber = 1;
    this.loadVolunteerTasks();
  }

  onPageChange(page: number): void {
    if (page < 1) {
      return;
    }

    this.pageNumber = page;
    this.loadVolunteerTasks();
  }

  get totalPages(): number {
  return Math.ceil(this.totalCount / this.pageSize) || 1;
}
}
