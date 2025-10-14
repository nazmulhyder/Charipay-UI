import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class VolunteerTasksComponent implements OnInit{
  userName : string = "";
   
  constructor(private auth : AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

}
