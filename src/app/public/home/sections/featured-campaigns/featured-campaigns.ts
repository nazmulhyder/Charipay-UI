import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-campaigns',
  imports: [CommonModule],
  templateUrl: './featured-campaigns.html',
  styleUrl: './featured-campaigns.css'
})
export class FeaturedCampaignsComponent {
  campaigns = [
      { title: 'Feed the Children', description: 'Provide meals to children in need.', progress: 75, image: 'assets/campaign1.jpg' },
      { title: 'Clean Water Project', description: 'Bring clean water to villages.', progress: 50, image: 'assets/campaign2.jpg' },
      { title: 'Education for All', description: 'Support education initiatives.', progress: 30, image: 'assets/campaign3.jpg' },
    ];
}
