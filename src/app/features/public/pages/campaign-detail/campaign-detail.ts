import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CampaignService } from '../../../../core/services/campaign.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-campaign-detail',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './campaign-detail.html',
  styleUrl: './campaign-detail.css'
})
export class CampaignDetail implements OnInit{
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



    constructor(
      private route: ActivatedRoute,
      private campaignService: CampaignService,
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
    ) {}

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

  const payload = {
  campaignId: this.route.snapshot.paramMap.get('id'),
  amount: Number(this.donationForm.value.amount),
  message: this.donationForm.value.message?.trim() || '',
  isAnonymous: this.donationMode === 'anonymous',
   paymentMethod: this.donationForm.value.paymentMethod
};

}
}
