import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { FeaturedCampaignsComponent } from './sections/featured-campaigns/featured-campaigns';
import { ImpactsComponent } from './sections/impacts/impacts';
import { HowItWorksComponent } from './sections/how-it-works/how-it-works';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
  [
    CommonModule, 
    HeroComponent,
    AboutComponent,
    FeaturedCampaignsComponent,
    ImpactsComponent,
    HowItWorksComponent

  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
