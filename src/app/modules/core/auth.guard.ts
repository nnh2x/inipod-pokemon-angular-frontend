import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.currentUserValue.pipe(
            take(1), // Take the latest value and complete the Observable
            map((currentUser: any) => {
                if (currentUser?.data) {
                    return this.authService
                        .validateToken(currentUser.token)
                        .pipe(
                            take(1),
                            map((response) => {
                                if (response.data) {
                                    return true;
                                } else {
                                    this.router.navigate(['/welcome/login']);
                                    return false;
                                }
                            })
                        );
                } else {
                    this.router.navigate(['/welcome/login']);
                    return of(false);
                }
            })
        );
    }
}
