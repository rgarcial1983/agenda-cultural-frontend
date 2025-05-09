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
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-eventos-list',
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
    MatFormFieldModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Eventos</h1>
        <button mat-raised-button color="primary" routerLink="nuevo">
          <mat-icon>add</mat-icon>
          Nuevo Evento
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
            <ng-container matColumnDef="titulo">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Título</th>
              <td mat-cell *matCellDef="let evento">{{evento.titulo}}</td>
            </ng-container>

            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Fecha</th>
              <td mat-cell *matCellDef="let evento">{{evento.fecha | date:'dd/MM/yyyy'}}</td>
            </ng-container>

            <ng-container matColumnDef="lugar">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Lugar</th>
              <td mat-cell *matCellDef="let evento">{{evento.lugar}}</td>
            </ng-container>

            <ng-container matColumnDef="ciudad">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Ciudad</th>
              <td mat-cell *matCellDef="let evento">{{evento.ciudad}}</td>
            </ng-container>

            <ng-container matColumnDef="categorias">
              <th mat-header-cell *matHeaderCellDef>Categorías</th>
              <td mat-cell *matCellDef="let evento">
                <mat-chip *ngFor="let cat of evento.categorias" color="primary" selected>
                  {{cat}}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let evento">
                <button mat-icon-button color="primary" [routerLink]="['editar', evento.id]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="eliminarEvento(evento)">
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

    mat-chip {
      margin: 4px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }
  `]
})
export class EventosListComponent implements OnInit {
  eventos = [
    {
      id: 1,
      titulo: 'Concierto de Música Clásica',
      fecha: new Date('2024-03-15'),
      lugar: 'Teatro Principal',
      ciudad: 'Zaragoza',
      categorias: ['Concierto', 'Música Sacra']
    },
    {
      id: 2,
      titulo: 'Taller de Cerámica',
      fecha: new Date('2024-03-20'),
      lugar: 'Centro Cultural',
      ciudad: 'Huesca',
      categorias: ['Taller', 'Artesanía']
    }
  ];

  columnas = ['titulo', 'fecha', 'lugar', 'ciudad', 'categorias', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<any>(this.eventos);
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.eventos);
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

  eliminarEvento(evento: any) {
    // Aquí iría la lógica para eliminar el evento
    console.log('Eliminar evento:', evento);
  }
} 