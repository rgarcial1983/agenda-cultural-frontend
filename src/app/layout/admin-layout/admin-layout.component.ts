import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  template: `
    <div class="admin-container">
      <mat-toolbar color="primary" class="admin-toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Agenda Cultural</span>
        <span class="toolbar-spacer"></span>
        <button mat-icon-button>
          <mat-icon>notifications</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="admin-sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="admin-sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/admin/eventos" routerLinkActive="active">
              <mat-icon>event</mat-icon>
              <span>Eventos</span>
            </a>
            <a mat-list-item routerLink="/admin/categorias" routerLinkActive="active">
              <mat-icon>category</mat-icon>
              <span>Categorías</span>
            </a>
            <a mat-list-item routerLink="/admin/usuarios" routerLinkActive="active">
              <mat-icon>people</mat-icon>
              <span>Usuarios</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="admin-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .admin-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .admin-sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .admin-sidenav {
      width: 250px;
      background: #fafafa;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    .admin-content {
      padding: 20px;
      background: #f5f5f5;
    }

    mat-nav-list {
      padding-top: 0;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 48px;
      color: rgba(0, 0, 0, 0.87);
    }

    mat-nav-list a.active {
      background: rgba(0, 0, 0, 0.04);
      color: #1976d2;
    }

    mat-nav-list mat-icon {
      color: rgba(0, 0, 0, 0.54);
    }

    mat-nav-list a.active mat-icon {
      color: #1976d2;
    }
  `]
})
export class AdminLayoutComponent {} 