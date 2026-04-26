import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CampaignService } from '../../../../core/services/campaign.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaign-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './campaign-detail.html',
  styleUrl: './campaign-detail.css'
})
export class CampaignDetail implements OnInit {
  campaign: any = null;
  loading = false;
  errorMessage = '';
  donationForm!: FormGroup;
  isSubmitting = false;
  showDonationForm = false;
  successMessage = '';
  donationErrorMessage = '';
  isLoggedIn = false;
  showDonationChoice = false;
  donationMode: 'anonymous' | 'nonAnonymous' | null = null;
  isDonor =false;


  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr : ToastrService
  ) { }

  initializeForm(): void {
    this.donationForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      message: [''],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.initializeForm();
    const campaignId = this.route.snapshot.paramMap.get('id');
    const role = this.authService.getUserRole();
    if(role == 'Donor') {this.isDonor = true;}

    if (campaignId) {
      this.getCampaignDetails(campaignId);
    } else {
      this.errorMessage = 'Invalid campaign ID.';
    }
  }


  getCampaignDetails(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.campaignService.getCampaignById(id).subscribe({
      next: (response) => {
        this.campaign = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load campaign details.';
        this.loading = false;
        console.error(error);
        this.toastr.error('Failed to load campaign details.', 'Error')
      }
    });
  }

  getProgress(): number {
    if (!this.campaign?.goalAmount || this.campaign.goalAmount <= 0) {
      return 0;
    }

    return Math.min((this.campaign.currentAmount / this.campaign.goalAmount) * 100, 100);
  }


  toggleDonationForm() {
    this.successMessage = '';
    this.donationErrorMessage = '';

    if (!this.campaign?.isActive) {
      this.donationErrorMessage = 'This campaign is closed for donations.';
      return;
    }

    this.showDonationChoice = true;
    this.showDonationForm = false;
  }

  chooseAnonymousDonation(): void {
    this.donationMode = 'anonymous';
    this.showDonationChoice = false;
    this.showDonationForm = true;
  }

  chooseNonAnonymousDonation(): void {
    this.donationMode = 'nonAnonymous';

    if (!this.isLoggedIn) {
      const campaignId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: `/campaigns/${campaignId}` }
      });
      return;
    }

    this.showDonationChoice = false;
    this.showDonationForm = true;
  }

  cancelDonationChoice(): void {
    this.showDonationChoice = false;
    this.showDonationForm = false;
    this.donationMode = null;
  }

  submitDonation(): void {

      if(this.donationForm.invalid)
      {
        this.donationForm.markAllAsTouched();
        return;
      }

    const payload = {
      campaignId: this.route.snapshot.paramMap.get('id'),
      amount: Number(this.donationForm.value.amount),
      message: this.donationForm.value.message?.trim() || '',
      isAnonymous: this.donationMode === 'anonymous'? true : false,
      paymentMethod: this.donationForm.value.paymentMethod
    };

console.log(payload);
  const request = this.campaignService.CreateDonation(payload);

  request.subscribe ({
    next : (res) => {
      console.log(res.data?.paymentStatus);
       console.log(res);
      if(res.data?.paymentStatus == 'Succeeded')
       {
        //alert(`Donation Successful`);
         this.toastr.success('Donation Successful!', 'Success')
         this.getCampaignDetails(res.data.campaignId);
       }
      else
        //alert('something went wrong in donation');
         this.toastr.error('Something went wrong in donation', 'Error')

      this.donationForm.reset();
      this.showDonationForm = false;
    },

    error: (err) =>{
        this.toastr.error('Something went wrong in donation', 'Error')
        this.donationForm.reset();
        this.showDonationForm = false;
    }
  })
  }
}
