import { Routes } from '@angular/router';
import { BAIL_ROUTES } from './bail-withdrawal/bail.routes';

export const routes: Routes = [
  {
    path: 'bail',children: BAIL_ROUTES
  }
 
];
