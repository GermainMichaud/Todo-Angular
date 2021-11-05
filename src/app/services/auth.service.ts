import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.API_URL;
  private userInfo = null;

  constructor(private http: HttpClient, private router: Router) {}

  get user(): any {
    return this.userInfo;
  }

  setUser(user: any) {
    this.userInfo = user;
  }

  public login(credentials: Record<string, string>): void {
    this.http.post(`${this.API_URL}/auth/login`, credentials).subscribe();
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userInfo = null;
    this.router.navigate(['/login']);
  }
}
