import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h1>Panel de Administración</h1>
      
      <div class="cards-container">
        <!-- Gestión de Perfiles -->
        <mat-card class="admin-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>people</mat-icon>
            <mat-card-title>Gestión de Perfiles</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Administra los perfiles de usuarios y sus permisos</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/perfil">
              <mat-icon>person</mat-icon>
              Ver Perfiles
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Gestión de Categorías -->
        <mat-card class="admin-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>category</mat-icon>
            <mat-card-title>Gestión de Categorías</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Administra las categorías de eventos culturales</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/categorias">
              <mat-icon>list</mat-icon>
              Ver Categorías
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Gestión de Ciudades -->
        <mat-card class="admin-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>location_city</mat-icon>
            <mat-card-title>Gestión de Ciudades</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Administra las ciudades disponibles para eventos</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/ciudades">
              <mat-icon>map</mat-icon>
              Ver Ciudades
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    h1 {
      margin-bottom: 30px;
      color: #333;
    }
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .admin-card {
      height: 100%;
    }
    mat-card-header {
      margin-bottom: 16px;
    }
    mat-card-content {
      margin-bottom: 16px;
    }
    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class DashboardHomeComponent {}
