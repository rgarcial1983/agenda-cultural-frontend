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
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { LocalizacionesService, Localizacion } from '../../../services/localizaciones.service';
import Swal from 'sweetalert2';

// Clase personalizada para la traducción del paginador
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}

@Component({
  selector: 'app-localizaciones-list',
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
    MatPaginatorModule
  ],
  providers: [
    LocalizacionesService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Localizaciones</h1>
        <button mat-raised-button color="primary" routerLink="nueva">
          <mat-icon>add</mat-icon>
          Nueva Localización
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
            <ng-container matColumnDef="lugar">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Lugar</th>
              <td mat-cell *matCellDef="let localizacion">{{localizacion.lugar}}</td>
            </ng-container>

            <ng-container matColumnDef="enlaceGoogleMaps">
              <th mat-header-cell *matHeaderCellDef>Enlace Google Maps</th>
              <td mat-cell *matCellDef="let localizacion">
                <a [href]="localizacion.enlaceGoogleMaps" target="_blank" class="maps-link">
                  <mat-icon>map</mat-icon>
                  Ver en Google Maps
                </a>
              </td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let localizacion">
                <button mat-icon-button color="primary" [routerLink]="['editar', localizacion.id]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="eliminarLocalizacion(localizacion)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columnas"></tr>
            <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
          </table>

          <mat-paginator [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
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

    .maps-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1976d2;
      text-decoration: none;
    }

    .maps-link:hover {
      text-decoration: underline;
    }

    .maps-link mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
  `]
})
export class LocalizacionesListComponent implements OnInit {
  localizaciones: Localizacion[] = [];
  columnas = ['lugar', 'enlaceGoogleMaps', 'acciones'];
  filtro = '';
  dataSource = new MatTableDataSource<Localizacion>([]);
  loading = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private localizacionesService: LocalizacionesService) {}

  ngOnInit(): void {
    this.cargarLocalizaciones();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sort({
      id: 'lugar',
      start: 'asc',
      disableClear: false
    });
  }

  cargarLocalizaciones(): void {
    this.loading = true;
    this.localizacionesService.getLocalizaciones().subscribe({
      next: (localizaciones) => {
        this.localizaciones = localizaciones;
        this.dataSource = new MatTableDataSource<Localizacion>(localizaciones);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: Localizacion, filter: string) => {
          const searchStr = filter.toLowerCase();
          return data.lugar.toLowerCase().includes(searchStr) ||
                 data.enlaceGoogleMaps.toLowerCase().includes(searchStr);
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar localizaciones:', error);
        this.localizaciones = [];
        this.dataSource = new MatTableDataSource<Localizacion>([]);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar las localizaciones', 'error');
      }
    });
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  eliminarLocalizacion(localizacion: Localizacion) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la localización "${localizacion.lugar}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localizacionesService.eliminarLocalizacion(localizacion.id).subscribe({
          next: () => {
            this.cargarLocalizaciones();
            Swal.fire('¡Eliminada!', 'La localización ha sido eliminada correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar la localización:', error);
            Swal.fire('Error', 'No se pudo eliminar la localización', 'error');
          }
        });
      }
    });
  }
} 