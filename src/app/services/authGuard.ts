import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private route: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(JSON.parse(sessionStorage.getItem('userData')) || sessionStorage.getItem('Guest')) {
            return true;
        }
        this.route.navigateByUrl('auth');
        return false;
    }
}