import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
 import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: LoginComponent,
    //canActivate:[AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
