import { Routes } from '@angular/router';
import { BailShellComponent } from './bail-shell/bail-shell.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { SummaryComponent } from './summary/summary.component';


export const BAIL_ROUTES: Routes = [
  {
    path: '', component: BailShellComponent,
    children: [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'attachments', component: AttachmentsComponent },
  { path: 'summary', component: SummaryComponent }
]

  }
];
