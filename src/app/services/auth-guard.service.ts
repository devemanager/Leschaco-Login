import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private authService: MsalService, public router: Router) { }

  async canActivate() {
    if (!await this.authService.getAccount()) {
      await this.router.navigate(['']);
       // console.log(this.router.navigate(['./../login']));
      return false;
    }
    return true;
  }
}
