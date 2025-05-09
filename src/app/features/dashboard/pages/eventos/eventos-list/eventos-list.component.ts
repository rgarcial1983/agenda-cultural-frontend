import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    MatMenuModule,
    MatSnackBarModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule
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
          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="titulo">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Título</th>
              <td mat-cell *matCellDef="let evento">{{evento.titulo}}</td>
            </ng-container>

            <ng-container matColumnDef="fecha">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Fecha</th>
              <td mat-cell *matCellDef="let evento">{{evento.fecha | date:'mediumDate'}}</td>
            </ng-container>

            <ng-container matColumnDef="lugar">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Lugar</th>
              <td mat-cell *matCellDef="let evento">{{evento.lugar}}, {{evento.ciudad}}</td>
            </ng-container>

            <ng-container matColumnDef="categorias">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Categorías</th>
              <td mat-cell *matCellDef="let evento">{{evento.categorias.join(', ')}}</td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let evento">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item [routerLink]="['editar', evento.id]">
                    <mat-icon>edit</mat-icon>
                    <span>Editar</span>
                  </button>
                  <button mat-menu-item (click)="eliminarEvento(evento)">
                    <mat-icon>delete</mat-icon>
                    <span>Eliminar</span>
                  </button>
                </mat-menu>
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
      padding: 1rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .search-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
    }
  `]
})
export class EventosListComponent implements OnInit {
  eventos = [
    {
      id: 1,
      titulo: 'Concierto de Jazz en el Palacio Vázquez de Molina',
      descripcion: 'Disfruta de una velada de jazz en uno de los palacios más emblemáticos de Úbeda.',
      fecha: new Date('2024-04-15'),
      lugar: 'Palacio Vázquez de Molina',
      ciudad: 'Úbeda',
      categorias: ['Música', 'Concierto']
    },
    {
      id: 2,
      titulo: 'Visita Guiada a la Catedral de Baeza',
      descripcion: 'Descubre los secretos y la historia de la Catedral de Baeza con nuestros guías expertos.',
      fecha: new Date('2024-04-20'),
      lugar: 'Catedral de Baeza',
      ciudad: 'Baeza',
      categorias: ['Patrimonio', 'Visita Guiada']
    },
    {
      id: 3,
      titulo: 'Taller de Cerámica Tradicional',
      descripcion: 'Aprende técnicas ancestrales de cerámica en Úbeda.',
      fecha: new Date('2024-05-10'),
      lugar: 'Casa de las Torres',
      ciudad: 'Úbeda',
      categorias: ['Taller', 'Artesanía']
    },
    {
      id: 4,
      titulo: 'Festival Gastronómico de Baeza',
      descripcion: 'Degusta los mejores platos de la cocina local.',
      fecha: new Date('2024-06-01'),
      lugar: 'Plaza del Pópulo',
      ciudad: 'Baeza',
      categorias: ['Gastronomía', 'Festival']
    },
    {
      id: 5,
      titulo: 'Concierto de Órgano',
      descripcion: 'Música sacra en la Iglesia de San Pablo.',
      fecha: new Date('2024-07-05'),
      lugar: 'Iglesia de San Pablo',
      ciudad: 'Úbeda',
      categorias: ['Concierto', 'Música Sacra']
    },
    {
      id: 6,
      titulo: 'Ruta Patrimonial Nocturna',
      descripcion: 'Recorrido nocturno por los monumentos de Baeza.',
      fecha: new Date('2024-08-12'),
      lugar: 'Centro Histórico',
      ciudad: 'Baeza',
      categorias: ['Patrimonio', 'Visita Guiada']
    },
    {
      id: 7,
      titulo: 'Feria de Artesanía',
      descripcion: 'Exposición y venta de productos artesanos.',
      fecha: new Date('2024-09-15'),
      lugar: 'Paseo de la Constitución',
      ciudad: 'Úbeda',
      categorias: ['Artesanía', 'Festival']
    }
  ];

  columnas = ['titulo', 'fecha', 'lugar', 'categorias', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<any>(this.eventos);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private snackBar: MatSnackBar) { }

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

  eliminarEvento(evento: any): void {
    // Aquí implementaremos la lógica de eliminación cuando tengamos los servicios
    this.snackBar.open('Evento eliminado correctamente', 'Cerrar', {
      duration: 3000
    });
  }
} 