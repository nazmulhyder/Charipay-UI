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
        charityId : ["0", Validators.required],
        currencyCode : ['GBP'],
        isFeatured : [false],
        isActive : [true]
     }, {Validators: endDateAfterStartDateValidator()});

     this.getLookupCharities();
     this.loadCampaigns();
     
  }

  onSubmit()
  {
      if(this.campaignForm.invalid)
      {
        this.campaignForm.markAllAsTouched();
        return;
      }

      this.loading = true;

      const formVal = this.campaignForm.value;

      const insertCampaign = {
          "campaignName": formVal.campaignName,
          "campaignDescription": formVal.campaignDescription,
          "goalAmount": formVal.goalAmount,
          "currentAmount": formVal.currentAmount,
          "campaignStartDate": formVal.campaignStartDate,
          "campaignEndDate": formVal.campaignEndDate,
          "imageUrl": "",
          "createdAt": new Date(),
          "charityId": formVal.charityId,       
           "isActive" : formVal.isActive,
          "currencyCode" : formVal.currencyCode ,
          "isFeatured" : formVal.isFeatured,


      };

      const updateCampaign = {
          "campaignId" : this.selectedCampaignId,
          "campaignName": formVal.campaignName,
          "campaignDescription": formVal.campaignDescription,
          "goalAmount": formVal.goalAmount,
          "currentAmount": formVal.currentAmount,
          "campaignStartDate": formVal.campaignStartDate,
          "campaignEndDate": formVal.campaignEndDate,
          "imageUrl": "",
          "createdAt": new Date(),
          "charityId": formVal.charityId,
          "isActive" : formVal.isActive,
          "currencyCode" : formVal.currencyCode ,
          "isFeatured" : formVal.isFeatured,
      };

      const request = this.isEditMode ? this.adminService.updateCampaign(updateCampaign) :
      this.adminService.createCampaign(insertCampaign);

      request.subscribe({
         next: (res) =>{
            this.loading = false;
            alert(`Campaign ${this.isEditMode? 'update' : 'Save'} successfully.`);
            this.resetForm();
            this.loadCampaigns();
         },
        error: (err) =>{
            alert('Error occured while save campaigns!');
            this.loading = false;
        }
         
      });


  }
  resetForm () {
    this.campaignForm.reset();
     this.campaignForm.patchValue({
        charityId : "0"     
    });
    this.loading = false;
  }
  onDelete(id: any) {
    this.loading = true;
    this.adminService.deleteCampaign(id) 
    .subscribe({
      next: (res) =>{
           alert('delete successfully!');
           this.loading = false;
           this.loadCampaigns();
      },
      error: (err) =>{
         alert('failed to delete data!');
         this.loading = false;
      }
    })
  }

  onEdit(campaign : Campaign) {
    console.log(campaign.isFeatured);
    this.isEditMode = true;
    this.selectedCampaignId = campaign.campaignId;
    this.campaignForm.patchValue({
        campaignName : campaign.campaignName,
        campaignDescription : campaign.campaignDescription,
        goalAmount : campaign.goalAmount,
        currentAmount : campaign.currentAmount,
        charityId : campaign.charityId,
        campaignStartDate : this.formatDate(campaign.campaignStartDate),
        campaignEndDate : this.formatDate(campaign.campaignEndDate),
        isActive: campaign.isActive,
        currencyCode : campaign.currencyCode ,
        isFeatured : campaign.isFeatured,
        
    });
  }

  private formatDate(dateString: string): string | null {
  if (!dateString) return null;
  return new Date(dateString).toISOString().split('T')[0];
  }

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

  onSearch(){
    this.pageNumber =1;
    this.loadCampaigns();
  }

  onPageChange(page:number) {}
  
  loadCampaigns(){
      this.loading = true;
      this.adminService.getAllCampaign(this.pageNumber, this.pageSize, this.searchTerm)
      .subscribe({
           next: (res) => {
              this.campaigns = res.data?.items;
              this.totalCount = res.data?.totalCount;
              this.loading = false;
           },
           error : (err) =>{
             alert('Failed to load campaigns data!');
             this.loading = false;
           }
      })
  }

  currencies = [
  { code: 'GBP', symbol: '£', name: 'Pound Sterling' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' }
];

getCurrencySymbol(code: string): string {
  const match = this.currencies.find(c => c.code === code);
  return match ? match.symbol : '';
}

}


