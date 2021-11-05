import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('/auth/login') && event.status === 200) {
            const body = event.body as {
              token: string;
              user: { id: number; name: string };
            };
            localStorage.setItem('token', body.token);
            localStorage.setItem('user', JSON.stringify(body.user));
            this.authService.setUser(body.user);
            this.router.navigate(['/']);
          }
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          console.log('Unauthorized');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.authService.setUser(null);
          this.router.navigate(['/login']);
        }
        return of(err);
      })
    );
  }
}
