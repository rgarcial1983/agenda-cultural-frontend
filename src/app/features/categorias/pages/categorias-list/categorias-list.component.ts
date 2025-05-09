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

@Component({
  selector: 'app-categorias-list',
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
        <h1>Gestión de Categorías</h1>
        <button mat-raised-button color="primary" routerLink="nueva">
          <mat-icon>add</mat-icon>
          Nueva Categoría
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Buscar</mat-label>
            <input matInput [(ngModel)]="filtro" (ngModelChange)="aplicarFiltro()" placeholder="Buscar...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="nombre">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
              <td mat-cell *matCellDef="let cat">{{cat.nombre}}</td>
            </ng-container>

            <ng-container matColumnDef="descripcion">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Descripción</th>
              <td mat-cell *matCellDef="let cat">{{cat.descripcion}}</td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let cat">
                <button mat-icon-button color="primary" [routerLink]="['editar', cat.id]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="eliminarCategoria(cat)">
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

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }

    table {
      width: 100%;
    }

    .mat-column-acciones {
      width: 120px;
      text-align: center;
    }
  `]
})
export class CategoriasListComponent implements OnInit {
  categorias = [
    { id: 1, nombre: 'Concierto', descripcion: 'Eventos musicales en directo.' },
    { id: 2, nombre: 'Taller', descripcion: 'Actividades prácticas y formativas.' },
    { id: 3, nombre: 'Gastronomía', descripcion: 'Eventos culinarios y degustaciones.' },
    { id: 4, nombre: 'Patrimonio', descripcion: 'Rutas y actividades patrimoniales.' },
    { id: 5, nombre: 'Festival', descripcion: 'Festivales culturales y artísticos.' },
    { id: 6, nombre: 'Artesanía', descripcion: 'Exposición y venta de productos artesanos.' },
    { id: 7, nombre: 'Música Sacra', descripcion: 'Conciertos y actividades de música sacra.' },
    { id: 8, nombre: 'Visita Guiada', descripcion: 'Recorridos guiados por la ciudad.' }
  ];

  columnas = ['nombre', 'descripcion', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<any>(this.categorias);
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.categorias);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = Object.values(data).reduce((acc: string, value: unknown) => {
        if (Array.isArray(value)) {
          return acc + ' ' + value.join(' ');
        }
        if (value instanceof Date) {
          return acc + ' ' + value.toLocaleDateString('es-ES');
        }
        return acc + ' ' + String(value);
      }, '').toLowerCase();
      return dataStr.includes(filter.toLowerCase());
    };
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  eliminarCategoria(cat: any) {
    // Aquí iría la lógica para eliminar la categoría
    console.log('Eliminar categoría:', cat);
  }
} 