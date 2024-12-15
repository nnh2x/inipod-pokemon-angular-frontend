import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Retrieve the token from localStorage (or any other storage mechanism)
        const token = localStorage.getItem('token');        
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    `Bearer ${JSON.parse(token).data}`
                ),
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}
