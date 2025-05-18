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
import Swal from 'sweetalert2';
import { EventosService, Evento } from '../../../../eventos/eventos.service';

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
  providers: [EventosService],
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
              <td mat-cell *matCellDef="let evento">
                <div class="lugar-ciudad">
                  <span class="lugar">{{evento.lugar}}</span>
                  <span class="ciudad">{{evento.ciudad}}</span>
                </div>
              </td>
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

    mat-chip {
      margin: 4px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 24px;
    }

    .lugar-ciudad {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lugar-ciudad .lugar {
      font-weight: 500;
    }

    .lugar-ciudad .ciudad {
      color: #666;
      font-size: 0.9em;
    }
  `]
})
export class EventosListComponent implements OnInit {
  eventos: Evento[] = [];
  columnas = ['titulo', 'fecha', 'lugar', 'categorias', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<Evento>([]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventosService.getEventos().subscribe((resp: any) => {
      const eventos = Array.isArray(resp) ? resp : (Array.isArray(resp.content) ? resp.content : []);
      this.eventos = eventos.map((e: any) => ({
        ...e,
        ciudad: e.localizacion?.lugar || '',
        categorias: Array.isArray(e.categorias)
          ? e.categorias.map((cat: any) => typeof cat === 'string' ? cat : cat.nombre)
          : []
      }));
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
    });
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  eliminarEvento(evento: Evento) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el evento "${evento.titulo}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventosService.eliminarEvento(evento.id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El evento ha sido eliminado correctamente.', 'success');
          this.cargarEventos();
        });
      }
    });
  }
} 