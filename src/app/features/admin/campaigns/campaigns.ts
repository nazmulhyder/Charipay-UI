import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { endDateAfterStartDateValidator } from '../../../shared/validators/endDateAfterStartDateValidator';
import { Campaign } from '../../../shared/models/campaign.model';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class AdminCampaigns implements OnInit{
   
  campaignForm!: FormGroup;
  isEditMode = false;
  charities: any = [];
  campaigns: any = [];
  searchTerm = "";
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  selectedCampaignId : any;
  totalCount : number =0;

  constructor(private fb: FormBuilder, private http:HttpClient, private adminService: AdminService) {
     
  }
  ngOnInit(): void {
    this.campaignForm = this.fb.group({
        campaignName : ["",Validators.required],
        campaignDescription : ["", Validators.required],
        goalAmount : ["", Validators.required],
        currentAmount : ["", Validators.required],
        campaignStartDate : ["", Validators.required],
        campaignEndDate : ["", Validators.required],
        imageUrl :[],
        charityId : ["0", Validators.required]
     }, {Validators: endDateAfterStartDateValidator()});

     this.getLookupCharities();
  }

  onSubmit(){}
  resetForm () {}
  onDelete(id: any) {}
  onEdit(campaign : Campaign) {}

  getLookupCharities(){
    this.adminService.getLookupCharity().subscribe({
      next:(res) => {
           this.charities = res;
      },

      error:(err) =>{
         alert('charity not found!');
      }
    })
  }

  onSearch(){}

  onPageChange(page:number) {}
  
}


