import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

interface DashboardStats {
  totalEventos: number;
  totalCategorias: number;
  totalCiudades: number;
  totalLocalizaciones: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>event</mat-icon>
            </div>
            <div class="stat-info">
              <h2>{{stats.totalEventos}}</h2>
              <p>Eventos</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>category</mat-icon>
            </div>
            <div class="stat-info">
              <h2>{{stats.totalCategorias}}</h2>
              <p>Categorías</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>location_city</mat-icon>
            </div>
            <div class="stat-info">
              <h2>{{stats.totalCiudades}}</h2>
              <p>Ciudades</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>place</mat-icon>
            </div>
            <div class="stat-info">
              <h2>{{stats.totalLocalizaciones}}</h2>
              <p>Localizaciones</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div class="actions-grid">
          <a mat-card routerLink="/admin/eventos/nuevo" class="action-card">
            <mat-card-content>
              <mat-icon>add_circle</mat-icon>
              <span>Nuevo Evento</span>
            </mat-card-content>
          </a>

          <a mat-card routerLink="/admin/categorias/nueva" class="action-card">
            <mat-card-content>
              <mat-icon>add_circle</mat-icon>
              <span>Nueva Categoría</span>
            </mat-card-content>
          </a>

          <a mat-card routerLink="/admin/ciudades/nueva" class="action-card">
            <mat-card-content>
              <mat-icon>add_circle</mat-icon>
              <span>Nueva Ciudad</span>
            </mat-card-content>
          </a>

          <a mat-card routerLink="/admin/localizaciones/nueva" class="action-card">
            <mat-card-content>
              <mat-icon>add_circle</mat-icon>
              <span>Nueva Localización</span>
            </mat-card-content>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }

    h1 {
      margin: 0 0 24px 0;
      color: rgba(0, 0, 0, 0.87);
      font-size: 24px;
      font-weight: 500;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    @media (max-width: 1200px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 24px;
    }

    .stat-icon {
      background: #e3f2fd;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }

    .stat-icon mat-icon {
      color: #1976d2;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .stat-info h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .stat-info p {
      margin: 4px 0 0 0;
      color: rgba(0, 0, 0, 0.54);
    }

    .quick-actions {
      margin-top: 32px;
    }

    .quick-actions h2 {
      margin: 0 0 16px 0;
      color: rgba(0, 0, 0, 0.87);
      font-size: 20px;
      font-weight: 500;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .action-card {
      text-decoration: none;
      color: inherit;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .action-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 16px;
    }

    .action-card mat-icon {
      color: #1976d2;
      margin-right: 8px;
    }

    .action-card span {
      font-weight: 500;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalEventos: 0,
    totalCategorias: 0,
    totalCiudades: 0,
    totalLocalizaciones: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    // Cargar total de eventos
    this.http.get<any>('http://localhost:8080/api/eventos').subscribe({
      next: (response) => {
        if (response && response.content && Array.isArray(response.content)) {
          this.stats.totalEventos = response.totalElements || response.content.length;
        } else {
          console.error('La respuesta de eventos no tiene el formato esperado:', response);
          this.stats.totalEventos = 0;
        }
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
        this.stats.totalEventos = 0;
      }
    });

    // Cargar total de categorías
    this.http.get<any[]>('http://localhost:8080/api/categorias').subscribe({
      next: (categorias) => {
        if (Array.isArray(categorias)) {
          this.stats.totalCategorias = categorias.length;
        } else {
          console.error('La respuesta de categorías no es un array:', categorias);
          this.stats.totalCategorias = 0;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.stats.totalCategorias = 0;
      }
    });

    // Cargar total de ciudades
    this.http.get<any[]>('http://localhost:8080/api/ciudades').subscribe({
      next: (ciudades) => {
        if (Array.isArray(ciudades)) {
          this.stats.totalCiudades = ciudades.length;
        } else {
          console.error('La respuesta de ciudades no es un array:', ciudades);
          this.stats.totalCiudades = 0;
        }
      },
      error: (error) => {
        console.error('Error al cargar ciudades:', error);
        this.stats.totalCiudades = 0;
      }
    });

    // Cargar total de localizaciones
    this.http.get<any[]>('http://localhost:8080/api/localizaciones').subscribe({
      next: (localizaciones) => {
        if (Array.isArray(localizaciones)) {
          this.stats.totalLocalizaciones = localizaciones.length;
        } else {
          console.error('La respuesta de localizaciones no es un array:', localizaciones);
          this.stats.totalLocalizaciones = 0;
        }
      },
      error: (error) => {
        console.error('Error al cargar localizaciones:', error);
        this.stats.totalLocalizaciones = 0;
      }
    });
  }
} 