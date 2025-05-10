import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="heroku-login-bg">
      <mat-card class="heroku-login-card">
        <div class="heroku-login-logo">
          <!-- Logo simple tipo Heroku -->
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#7952B3"/>
            <text x="20" y="27" text-anchor="middle" fill="#fff" font-size="22" font-family="Arial" font-weight="bold">AC</text>
          </svg>
        </div>
        <div class="heroku-login-title">Inicia sesión en tu cuenta</div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="heroku-login-form">
          <mat-form-field appearance="fill" class="heroku-full-width">
            <mat-label>Usuario</mat-label>
            <input matInput formControlName="username" required autocomplete="username">
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              El usuario es obligatorio
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill" class="heroku-full-width">
            <mat-label>Contraseña</mat-label>
            <input matInput type="password" formControlName="password" required autocomplete="current-password">
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es obligatoria
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" class="heroku-login-btn" type="submit" [disabled]="loginForm.invalid || isLoading">
            Iniciar sesión
          </button>
        </form>
        <div class="heroku-login-links">
          <a href="#" class="heroku-link">¿Olvidaste tu contraseña?</a>
          <span>·</span>
          <a href="#" class="heroku-link">Crear cuenta</a>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
    .heroku-login-bg {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .heroku-login-card {
      width: 100%;
      max-width: 370px;
      margin: 2em auto;
      border-radius: 1.2rem;
      box-shadow: 0 2px 12px rgba(44, 62, 80, 0.07);
      padding: 2.2rem 2rem 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
    }
    .heroku-login-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.2rem;
    }
    .heroku-login-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #222;
      text-align: center;
      margin-bottom: 1.5rem;
      letter-spacing: 0.5px;
      font-family: 'Inter', Arial, sans-serif;
    }
    .heroku-login-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      margin-bottom: 1.2rem;
    }
    .heroku-full-width {
      width: 100%;
    }
    .heroku-login-btn {
      width: 100%;
      font-size: 1.08rem;
      font-weight: 600;
      padding: 0.9rem 0;
      border-radius: 0.7rem;
      background: #7952B3;
      color: #fff;
      box-shadow: 0 2px 8px rgba(121,82,179,0.09);
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: background 0.2s;
    }
    .heroku-login-btn:hover {
      background: #5f3a99;
    }
    mat-form-field {
      background: #f8f9fa;
      border-radius: 0.5rem;
    }
    .heroku-login-links {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.98rem;
      color: #7952B3;
      margin-top: 0.5rem;
    }
    .heroku-link {
      color: #7952B3;
      text-decoration: none;
      font-weight: 500;
      transition: text-decoration 0.2s;
    }
    .heroku-link:hover {
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .heroku-login-card {
        padding: 1.2rem 0.5rem 0.5rem 0.5rem;
      }
    }
    `
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;
      setTimeout(() => {
        this.isLoading = false;
        const success = this.authService.login(username, password);
        if (success) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      }, 800);
    }
  }
} 