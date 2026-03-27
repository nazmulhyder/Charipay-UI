import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Charity } from '../../../shared/models/charity.model';

@Component({
  selector: 'app-charities',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './charities.html',
  styleUrl: './charities.css'
})
export class Charities implements OnInit{
    charityForm!  : FormGroup;
    loading = false;
    isEditMode = false;
    charityId?:string;
    charities : any[]  = [];
    pageNumber = 1;
    pageSize = 10;
    searchTerm = '';
    totalCount =0;
    previewUrl: string | ArrayBuffer | null = null;
    selectedCharityId : string = '';



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
      this.charityForm = this.fb.group({
          name : ['', Validators.required],
          registrationNumber : ['', Validators.required],
          description : [''],
          website : [''],
          contactEmail : ['', Validators.required, Validators.email],
      });

      this.loadCharities();
  }

  onSubmit()
  {
    if(this.charityForm.invalid)
    {
      this.charityForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formVal = this.charityForm.value;

    const insert_data = {
         "name" : formVal.name,
         "registrationNumber" : formVal.registrationNumber,
         "description" : formVal.description,
         "website" : formVal.website,
         "contactEmail" : formVal.contactEmail
    };

    const update_data = {
         "charityId" : this.selectedCharityId,
         "name" : formVal.name,
         "registrationNumber" : formVal.registrationNumber,
         "description" : formVal.description,
         "website" : formVal.website,
         "contactEmail" : formVal.contactEmail
    };

    const request = 
    this.isEditMode ? 
    this.adminService.updateCharity(update_data) 
    : this.adminService.createCharity(insert_data);

    request.subscribe({
      next: (res) => {
         this.loading = false;
         alert(`Chairy ${this.isEditMode ? 'updated' : 'created'} successfully`);
         this.resetForm();
         this.loadCharities();
      },
      error: (res)=>{
        console.log(res.error.message);
        console.error(`${res.error.message? res.error.message : 'Error occured while saving charity!'}`);
        alert(`${res.error.message? res.error.message : 'Error occured while saving charity!'}`);
        this.loading = false;
      }

    })
  }

  loadCharities()
  {
    this.loading = true;
    this.adminService.getAllCharity(this.pageNumber, this.pageSize, this.searchTerm)
    .subscribe({
      next : (res) => {
        console.log('charities', res);
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

  onEdit(charity : Charity){
 
    this.isEditMode = true;
    this.selectedCharityId = charity.charityId;
    console.log('selectedCharityId', this.selectedCharityId);

    this.charityForm.patchValue({
      name : charity.name,
      description: charity.description,
      registrationNumber : charity.registrationNumber,
      website : charity.website,
      contactEmail: charity.contactEmail
    })

  }

  onDelete(charityId : string)
  {
    // console.log(charityId);
    if(confirm('Are you sure to delete this charity? This action cannot be undone.')) {
    this.loading = true;
     this.adminService.deleteCharity(charityId).subscribe({
       next: (res) =>{
          console.log(res);
          alert("deleted successully");
          this.loading = false;
       },

       error: (err) =>{
          console.log(err);
          alert("something went wrong!");
          this.loading = false;
       }
     });

     this.loadCharities();
    }
  }

  resetForm()
  {
    this.charityForm.reset();
    this.isEditMode = false;
    this.selectedCharityId = '';
  }


  onSearch()
  {
    this.pageNumber = 1;
    this.loadCharities();
  }

  onPageChange(page:number)
  {
     this.pageNumber = page;
     this.loadCharities();
  }
    
}
