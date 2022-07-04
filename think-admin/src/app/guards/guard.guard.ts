import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  public userLoged:any;
  constructor(private authService: AuthService, private router:Router, private route:ActivatedRoute){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userLoged = this.authService.getUserLoged()

    if(!this.userLoged){
      this.router.navigate(['login'], { relativeTo: this.route })
    }
    return this.userLoged;
  }
  
}
