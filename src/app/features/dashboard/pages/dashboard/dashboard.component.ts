import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="dashboard-cards">
        <mat-card class="dashboard-card">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <mat-icon>event</mat-icon>
              </div>
              <div class="card-info">
                <h2>Total Eventos</h2>
                <p class="card-value">24</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <mat-icon>category</mat-icon>
              </div>
              <div class="card-info">
                <h2>Categorías</h2>
                <p class="card-value">8</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <mat-icon>people</mat-icon>
              </div>
              <div class="card-info">
                <h2>Usuarios</h2>
                <p class="card-value">156</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="dashboard-actions">
        <button mat-raised-button color="primary" routerLink="/admin/eventos/nuevo">
          <mat-icon>add</mat-icon>
          Nuevo Evento
        </button>
        <button mat-raised-button color="accent" routerLink="/admin/categorias/nueva">
          <mat-icon>add</mat-icon>
          Nueva Categoría
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
      color: rgba(0, 0, 0, 0.87);
      font-size: 24px;
      font-weight: 500;
    }

    .dashboard-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .dashboard-card {
      background: white;
    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .card-icon {
      background: #e3f2fd;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-icon mat-icon {
      color: #1976d2;
    }

    .card-info h2 {
      margin: 0;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.54);
    }

    .card-value {
      margin: 8px 0 0;
      font-size: 24px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .dashboard-actions {
      display: flex;
      gap: 16px;
    }

    .dashboard-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class DashboardComponent {} 