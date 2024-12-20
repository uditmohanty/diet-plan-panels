import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Ensure token is stored as 'token'
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`, // Use backticks for template literals
                },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        localStorage.clear(); // Clear token on unauthorized access
                        this.router.navigate(['/auth/boxed-signin']);
                    }
                }
                return throwError(err);
            }),
        );
    }
}
