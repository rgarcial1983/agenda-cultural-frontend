import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [mode]="'side'"
          [opened]="true">
        <mat-toolbar>Menú</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/admin/eventos">
            <mat-icon matListItemIcon>event</mat-icon>
            <span matListItemTitle>Eventos</span>
          </a>
          <a mat-list-item routerLink="/admin/categorias">
            <mat-icon matListItemIcon>category</mat-icon>
            <span matListItemTitle>Categorías</span>
          </a>
          <a mat-list-item routerLink="/admin/perfil">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Mi Perfil</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Agenda Cultural</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button matTooltip="Cerrar sesión" (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .content {
      padding: 20px;
    }
  `]
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Aceptar',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/admin']);
    });
  }
} 