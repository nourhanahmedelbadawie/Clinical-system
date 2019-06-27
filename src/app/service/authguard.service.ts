import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authservice.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(  public authservice:AuthService,private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservice.isAuthenticated()) {
        return true;
    }
    else{
       // navigate to login page

    this._router.navigate(['/signin']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;

    }

   
  }

}