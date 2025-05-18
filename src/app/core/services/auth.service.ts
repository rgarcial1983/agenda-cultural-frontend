import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuth();
  }

  private checkAuth(): void {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('currentUser');
      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          this.isAuthenticatedSubject.next(true);
          this.usernameSubject.next(user.username);
        } catch (e) {
          this.clearAuth();
        }
      } else {
        this.clearAuth();
      }
    }
  }

  private clearAuth(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next('');
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  login(username: string, password: string): boolean {
    if (this.isBrowser() && username && password) {
      const user = { username };
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', 'dummy-token'); // En producción, esto vendría del backend
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }
} 