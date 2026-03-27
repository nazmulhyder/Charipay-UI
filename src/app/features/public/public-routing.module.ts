import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Campaigns } from "./pages/campaigns/campaigns";
import { CampaignDetail } from "./pages/campaign-detail/campaign-detail";
import { CharityProfile } from "./pages/charity-profile/charity-profile";
import { AboutComponent } from "./pages/about/about";
import { HowItWorksComponent } from "./pages/how-it-works/how-it-works";
import { LearnMoreComponent } from "./pages/learn-more/learn-more";

// These are publicly accessible (no login needed).

export const PUBLIC_ROUTES: Routes = [
     {path:'' , component: Home},
     {path: 'campaigns', component:Campaigns},
     {path:'campaigns/:id', component: CampaignDetail},
     {path: 'charities/:id', component: CharityProfile},
     {path: 'about', component:AboutComponent},
     {path: 'how-it-works', component:HowItWorksComponent},
     {path: 'learn-more', component:LearnMoreComponent},

]