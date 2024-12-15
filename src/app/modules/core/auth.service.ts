import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

export interface Login {
    userName: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly authUrl = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<any | null>;
    public currentUser$: Observable<any | null>; // Public observable for subscribers
    private readonly http = inject(HttpClient);
    protected router = inject(Router);
    constructor() {
        const storedUser = this.getStoredUser();
        this.currentUserSubject = new BehaviorSubject<any | null>(storedUser);
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    /**
     * Retrieve the stored user from local storage.
     * @returns Stored user object or null.
     */
    private getStoredUser(): any | null {
        try {
            const token = localStorage.getItem('token');
            return token ? JSON.parse(token) : null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Getter for the current user value.
     * @returns Current user object or null.
     */
    public get currentUserValue(): any {
        return this.currentUserSubject;
    }

    /**
     * Perform login and store the user token in local storage.
     * @param email User's email.
     * @param password User's password.
     * @returns Observable of the user object.
     */
    login(login: Login): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/auth/login`, login).pipe(
            map((response) => {
                if (response && response.data) {
                    localStorage.setItem('token', JSON.stringify(response));
                    this.currentUserSubject.next(response); // Notify subscribers of the new user
                }
                return response;
            })
        );
    }

    register(login: Login): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/auth/register`, login).pipe(
            map((response) => {
                if (response && response.data) {
                    localStorage.setItem('token', JSON.stringify(response));
                    this.currentUserSubject.next(response); // Notify subscribers of the new user
                }
                return response;
            })
        );
    }

    /**
     * Validate the stored token with the server.
     * @returns Observable indicating whether the token is valid.
     */
    validateToken(token: string): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/auth/validate-token`, {
            token,
        });
    }

    /**
     * Log out the current user by clearing local storage and resetting the current user.
     */
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/welcome/login']);
        this.currentUserSubject.next(null); // Notify subscribers of logout
    }
}
