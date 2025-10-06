import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Campaigns } from "./pages/campaigns/campaigns";
import { CampaignDetail } from "./pages/campaign-detail/campaign-detail";
import { CharityProfile } from "./pages/charity-profile/charity-profile";

// These are publicly accessible (no login needed).

export const PUBLIC_ROUTES: Routes = [
     {path:'' , component: Home},
     {path: 'campaigns', component:Campaigns},
     {path:'campaigns/:id', component: CampaignDetail},
     {path: 'charities/:id', component: CharityProfile}
]