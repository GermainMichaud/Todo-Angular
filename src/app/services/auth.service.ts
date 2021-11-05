import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public login(credentials: Record<string, string>): void {
    this.http.post(`${this.API_URL}/auth/login`, credentials).subscribe();
  }
}
