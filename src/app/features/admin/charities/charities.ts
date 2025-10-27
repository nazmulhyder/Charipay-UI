import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { charity } from '../../../shared/models/charity.model';

@Component({
  selector: 'app-charities',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './charities.html',
  styleUrl: './charities.css'
})
export class Charities implements OnInit{
    form!  : FormGroup;
    loading = false;
    isEditMode = false;
    charityId?:string;
    charities : any[]  = [];
    pageNumber = 1;
    pageSize = 10;
    searchTerm = '';
    totalCount =0;
    previewUrl: string | ArrayBuffer | null = null;



    constructor(
      private fb:FormBuilder, 
      private http:HttpClient, 
      private adminService : AdminService,
      private route : ActivatedRoute,
      private router : Router
    )
    {

    }

  ngOnInit(): void {
    console.log('is edit', this.isEditMode);
     this.charityId = this.route.snapshot.paramMap.get('id') || undefined;
     this.isEditMode = !! this.charityId;
      this.pageNumber =1;
      this.form = this.fb.group({
          name : ['', Validators.required],
          registrationNumber : ['', Validators.required],
          description : ['', Validators.required],
          website : ['', Validators.required],
          contactEmail : ['', Validators.required],
      });

      this.loadCharities();
  }

  onSubmit()
  {

  }

  loadCharities()
  {
    this.loading = true;
    this.adminService.getAllCharity(this.pageNumber, this.pageSize, this.searchTerm)
    .subscribe({
      next : (res) => {
        this.loading = false;
        this.charities = res.data?.items || [];
        this.totalCount = res.data?.totalCount || 0;
      },

      error: (err) => {
        this.loading = false;
        console.error('Failed to load charaties', err);
      }
    });
  }

  onEdit(charity : charity){}
  resetForm(){}
    
}
