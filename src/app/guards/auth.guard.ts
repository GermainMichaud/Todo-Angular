import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!this.authService.user) {
      return true;
    }
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (token && user.id) {
      this.authService.setUser(user);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
