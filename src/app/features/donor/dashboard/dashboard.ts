import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DonorDashboardComponent implements OnInit {
  userName : string = '';
  constructor(private auth : AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

}
