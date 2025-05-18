import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../features/dashboard/components/navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NavbarComponent
  ],
  template: `
    <div class="admin-container">
      <app-navbar></app-navbar>
      <mat-sidenav-container class="admin-sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="admin-sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>dashboard</mat-icon>
                <span>Dashboard</span>
              </span>
            </a>
            <a mat-list-item routerLink="/admin/eventos" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>event</mat-icon>
                <span>Eventos</span>
              </span>
            </a>
            <a mat-list-item routerLink="/admin/categorias" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>category</mat-icon>
                <span>Categorías</span>
              </span>
            </a>
            <a mat-list-item routerLink="/admin/ciudades" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>location_city</mat-icon>
                <span>Ciudades</span>
              </span>
            </a>
            <a mat-list-item routerLink="/admin/localizaciones" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>place</mat-icon>
                <span>Localizaciones</span>
              </span>
            </a>
            <a mat-list-item routerLink="/admin/usuarios" routerLinkActive="active">
              <span class="menu-item">
                <mat-icon>people</mat-icon>
                <span>Usuarios</span>
              </span>
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content class="admin-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `.admin-container { display: flex; flex-direction: column; height: 100vh; }
    .admin-sidenav-container { flex: 1; margin-top: 64px; }
    .admin-sidenav { width: 250px; background: #fafafa; border-right: 1px solid rgba(0, 0, 0, 0.12); }
    .admin-content { padding: 20px; background: #f5f5f5; }
    mat-nav-list { padding-top: 0; }
    mat-nav-list a { 
      height: 48px;
      color: rgba(0, 0, 0, 0.87);
    }
    mat-nav-list a.active { 
      background: rgba(0, 0, 0, 0.04); 
      color: #1976d2; 
    }
    .menu-item {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .menu-item mat-icon {
      color: rgba(0, 0, 0, 0.54);
      margin-right: 16px;
      width: 24px;
      height: 24px;
      line-height: 24px;
    }
    .menu-item span {
      line-height: 24px;
    }
    mat-nav-list a.active .menu-item mat-icon {
      color: #1976d2;
    }`
  ]
})
export class AdminLayoutComponent {} 