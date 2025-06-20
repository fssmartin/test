import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs'; 
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'  // <-- This provides it application-wide automatically
})
export class AuthGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const permission = route.data['permission'];
        let access = true;
  
        const isAuthenticated = this._authService.isLoggedIn();
        console.log("[isAuthenticated - canActivate ] ",isAuthenticated);

        return !isAuthenticated ? this.router.navigate(['/']) : true;  

    }
}
