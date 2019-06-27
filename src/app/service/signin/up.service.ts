import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authservice.service';

@Injectable({
  providedIn: 'root'
})
export class UpService {

  constructor(  public authservice:AuthService,private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authservice.isAuthenticated()) {
        return true;
    }
    else{
       // navigate to login page
    this._router.navigate(['/home/dashboard']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;

    }

   
  }
}
