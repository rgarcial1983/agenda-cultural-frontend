import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Ciudad {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-ciudades-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Ciudades</h1>
        <button mat-raised-button color="primary" routerLink="nueva">
          <mat-icon>add</mat-icon>
          Nueva Ciudad
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Buscar</mat-label>
            <input matInput [(ngModel)]="filtro" (ngModelChange)="aplicarFiltro()" placeholder="Buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <table mat-table [dataSource]="dataSource" matSort class="ngx-table">
            <ng-container matColumnDef="nombre">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
              <td mat-cell *matCellDef="let ciudad">{{ciudad.nombre}}</td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let ciudad">
                <button mat-icon-button color="primary" [routerLink]="['editar', ciudad.id]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="eliminarCiudad(ciudad)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columnas"></tr>
            <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      color: rgba(0, 0, 0, 0.87);
      font-size: 24px;
      font-weight: 500;
    }

    .ngx-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    .ngx-table th.mat-header-cell {
      background: #1976d2;
      color: white;
      font-weight: 600;
      padding: 16px;
      border-bottom: 1px solid #edf1f7;
    }

    .ngx-table td.mat-cell {
      padding: 16px;
      border-bottom: 1px solid #edf1f7;
      color: #222b45;
    }

    .ngx-table tr.mat-row:nth-child(even) {
      background: #f0f4f8;
    }

    .ngx-table tr.mat-row:hover {
      background: #e3f2fd;
    }

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }
  `]
})
export class CiudadesListComponent implements OnInit {
  ciudades: Ciudad[] = [];
  columnas = ['nombre', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<Ciudad>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCiudades();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sort({
      id: 'nombre',
      start: 'asc',
      disableClear: false
    });
  }

  cargarCiudades(): void {
    this.http.get<Ciudad[]>('http://localhost:8080/api/ciudades').subscribe({
      next: (ciudades) => {
        this.ciudades = ciudades;
        this.dataSource = new MatTableDataSource(this.ciudades);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Ciudad, filter: string) => {
          return data.nombre.toLowerCase().includes(filter.toLowerCase());
        };
      },
      error: (error) => {
        console.error('Error al cargar las ciudades:', error);
        Swal.fire('Error', 'No se pudieron cargar las ciudades', 'error');
      }
    });
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  eliminarCiudad(ciudad: Ciudad) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la ciudad "${ciudad.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/api/ciudades/${ciudad.id}`).subscribe({
          next: () => {
            this.cargarCiudades();
            Swal.fire('¡Eliminada!', 'La ciudad ha sido eliminada correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar la ciudad:', error);
            Swal.fire('Error', 'No se pudo eliminar la ciudad', 'error');
          }
        });
      }
    });
  }
} 