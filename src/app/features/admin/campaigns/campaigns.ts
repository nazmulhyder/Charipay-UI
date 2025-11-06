import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class AdminCampaigns implements OnInit{
   
  campaignForm!: FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient) {
     
  }
  ngOnInit(): void {
    this.campaignForm = this.fb.group({
        campaignName : [],
        campaignDescription : [],
        goalAmount : [],
        currentAmount : [],
        campaignStartDate : [],
        campaignEndDate : [],
        imageUrl :[],
        charityId : []
     });
  }

  onSubmit(){}

  
}
