import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';  // ✅ Fixed import

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard  implements OnInit{
  summaryCards = [
    { title: 'Total Donations', value: '$12,345' },
    { title: 'Active Campaigns', value: 5 },
    { title: 'Total Donors', value: 256 },
    { title: 'Pending Requests', value: 8 }
  ];

  recentDonations = [
    { name: 'John Doe', amount: 50, date: new Date() },
    { name: 'Jane Smith', amount: 100, date: new Date() },
    { name: 'Alex Johnson', amount: 75, date: new Date() }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initCharts();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  initCharts() {
    // Donations Over Time
    new Chart('donationChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Donations ($)',
          data: [100, 200, 150, 300, 250],
          borderColor: '#2575fc',
          backgroundColor: 'rgba(37,117,252,0.2)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Campaign Performance
    new Chart('campaignChart', {
      type: 'doughnut',
      data: {
        labels: ['Campaign A', 'Campaign B', 'Campaign C'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['#2575fc','#6a11cb','#f6c23e']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
