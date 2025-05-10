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
import Swal from 'sweetalert2';

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

          <table mat-table [dataSource]="dataSource" matSort class="ngx-table">
            <ng-container matColumnDef="nombre">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Nombre</th>
              <td mat-cell *matCellDef="let categoria">{{categoria.nombre}}</td>
            </ng-container>

            <ng-container matColumnDef="descripcion">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Descripción</th>
              <td mat-cell *matCellDef="let categoria">{{categoria.descripcion}}</td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let categoria">
                <div class="acciones-container">
                  <button mat-icon-button color="primary" [routerLink]="['/dashboard/categorias/editar', categoria.id]">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="eliminarCategoria(categoria)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
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
      background: #f7f9fc;
      color: #1e2132;
      font-weight: 600;
      padding: 16px;
      border-bottom: 1px solid #edf1f7;
    }

    .ngx-table td.mat-cell {
      padding: 16px;
      border-bottom: 1px solid #edf1f7;
      color: #222b45;
    }

    .ngx-table tr.mat-row:hover {
      background: #f7f9fc;
    }

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }

    .acciones-container {
      display: flex;
      gap: 8px;
    }
  `]
})
export class CategoriasListComponent implements OnInit {
  categorias = [
    {
      id: 1,
      nombre: 'Concierto',
      descripcion: 'Eventos musicales en vivo'
    },
    {
      id: 2,
      nombre: 'Teatro',
      descripcion: 'Obras teatrales y representaciones'
    }
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
        return acc + ' ' + String(value);
      }, '').toLowerCase();
      return dataStr.includes(filter.toLowerCase());
    };
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  eliminarCategoria(categoria: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la categoría "${categoria.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí iría la lógica para eliminar la categoría
        Swal.fire(
          '¡Eliminada!',
          'La categoría ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  }
} 