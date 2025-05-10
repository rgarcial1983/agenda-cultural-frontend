import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
    if (this.isBrowser()) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(user.username);
      }
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  login(username: string, password: string): boolean {
    if (this.isBrowser() && username && password) {
      const user = { username };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isAuthenticatedSubject.next(true);
      this.usernameSubject.next(username);
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next('');
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