import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  lugar: string;
  ciudad: string;
  categorias: string[];
  imagen?: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-eventos-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatMomentDateModule
  ],
  template: `
    <div class="adminlte-bg">
      <div class="breadcrumb-bar">
        <mat-icon>home</mat-icon>
        <span>Inicio</span>
        <mat-icon>chevron_right</mat-icon>
        <span>Agenda Cultural</span>
      </div>
      <mat-card class="adminlte-box">
        <div class="adminlte-header">
          <h1>Agenda Cultural</h1>
        </div>
        <div class="filtros-row">
          <mat-form-field appearance="outline" class="filtro-item">
            <mat-label><mat-icon class="filtro-icon">location_city</mat-icon> Ciudad</mat-label>
            <mat-select [(ngModel)]="filtroCiudad" (selectionChange)="filtrarEventos()">
              <mat-option value="">Todas</mat-option>
              <mat-option value="Úbeda">Úbeda</mat-option>
              <mat-option value="Baeza">Baeza</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filtro-item">
            <mat-label><mat-icon class="filtro-icon">event</mat-icon> Fecha</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="filtroFecha" (dateChange)="filtrarEventos()">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filtro-item">
            <mat-label><mat-icon class="filtro-icon">category</mat-icon> Categoría</mat-label>
            <mat-select [(ngModel)]="filtroCategoria" (selectionChange)="filtrarEventos()">
              <mat-option value="">Todas</mat-option>
              <mat-option *ngFor="let cat of categoriasDisponibles" [value]="cat">{{cat}}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card>
      <div class="eventos-grid">
        <mat-card *ngFor="let evento of eventosFiltrados" class="evento-card adminlte-event-card">
          <img mat-card-image [src]="evento.imagen" [alt]="evento.titulo">
          <mat-card-content>
            <h2>{{evento.titulo}}</h2>
            <p class="fecha">
              <mat-icon class="evento-icon">event</mat-icon>
              {{evento.fecha | date:'longDate'}}
            </p>
            <p class="lugar">
              <mat-icon class="evento-icon">location_on</mat-icon>
              {{evento.lugar}} {{evento.ciudad}}
            </p>
            <p class="descripcion">{{evento.descripcion}}</p>
            <div class="categorias">
              <mat-chip color="primary" selected *ngFor="let categoria of evento.categorias">
                <mat-icon class="evento-icon">category</mat-icon> {{categoria}}
              </mat-chip>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
    .adminlte-bg {
      background: #f4f6f9;
      min-height: 100vh;
      padding: 0;
    }
    .breadcrumb-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6c757d;
      font-size: 1.05rem;
      margin: 0 auto 0.7rem auto;
      max-width: 1200px;
      padding-left: 0.5rem;
    }
    .breadcrumb-bar mat-icon {
      font-size: 1.1em;
      color: #28a745;
      vertical-align: middle;
    }
    .adminlte-box {
      background: #fff;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(40,167,69,0.08), 0 1.5px 4px rgba(0,0,0,0.04);
      padding: 0;
      margin: 0 auto 1.2rem auto;
      max-width: 900px;
    }
    .adminlte-header {
      border-bottom: 1.5px solid #e0e0e0;
      margin-bottom: 0.7rem;
      padding: 0.7rem 1.2rem 0.2rem 1.2rem;
    }
    .adminlte-header h1 {
      font-size: 1.6rem;
      color: #28a745;
      font-weight: 700;
      margin: 0;
      letter-spacing: -1px;
    }
    .filtros-row {
      display: flex;
      gap: 0.7rem;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin: 0 1.2rem 0.7rem 1.2rem;
    }
    .filtro-item {
      min-width: 140px;
      flex: 1 1 160px;
      background: transparent;
      border-radius: 8px;
      font-size: 0.98rem;
    }
    .mat-form-field {
      width: 100%;
      font-size: 0.98rem;
    }
    .mat-form-field-appearance-outline .mat-form-field-outline {
      color: #28a745;
    }
    .mat-form-field-label {
      color: #28a745 !important;
      font-weight: 500;
      font-size: 1.08rem;
    }
    .mat-select-value {
      color: #28a745;
    }
    .filtro-icon {
      color: #28a745 !important;
      margin-right: 0.2rem;
      font-size: 2.1em !important;
      vertical-align: middle;
    }
    .evento-icon {
      color: #28a745 !important;
      font-size: 1.4em;
      vertical-align: middle;
      margin-right: 0.2rem;
    }
    .eventos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .adminlte-event-card {
      background: #fff;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(40,167,69,0.08), 0 1.5px 4px rgba(0,0,0,0.04);
      border: 1px solid #e0e0e0;
      transition: box-shadow 0.2s;
    }
    .adminlte-event-card:hover {
      box-shadow: 0 4px 16px rgba(40,167,69,0.13), 0 2px 8px rgba(0,0,0,0.07);
      border-color: #b2dfdb;
    }
    .evento-card img {
      height: 200px;
      object-fit: cover;
      border-radius: 0.75rem 0.75rem 0 0;
    }
    .evento-card mat-card-content {
      flex-grow: 1;
    }
    .evento-card h2 {
      font-size: 1.15rem;
      margin: 1rem 0 0.5rem 0;
      color: #222;
      font-weight: 600;
    }
    .fecha, .lugar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      margin: 0.3rem 0;
    }
    .descripcion {
      margin: 0.7rem 0;
      color: #444;
      line-height: 1.5;
    }
    .categorias {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.7rem 0;
    }
    .mat-chip {
      background: #c8e6c9 !important;
      color: #256029 !important;
      margin-right: 0.3rem;
    }
    mat-card-actions {
      display: none;
    }
    @media (max-width: 900px) {
      .filtros-row {
        flex-direction: column;
        gap: 0.5rem;
      }
      .adminlte-box {
        padding: 0.7rem 0.3rem 0.3rem 0.3rem;
      }
    }
    @media (max-width: 600px) {
      .adminlte-bg {
        padding: 0.5rem 0 0.5rem 0;
      }
      .eventos-grid {
        grid-template-columns: 1fr;
      }
    }
    `
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, firstDayOfWeek: 1 } }
  ],
})
export class EventosListComponent implements OnInit {
  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Concierto de Jazz en el Palacio Vázquez de Molina',
      descripcion: 'Disfruta de una velada de jazz en uno de los palacios más emblemáticos de Úbeda.',
      fecha: new Date('2024-04-15'),
      lugar: 'Palacio Vázquez de Molina',
      ciudad: 'Úbeda',
      categorias: ['Música', 'Concierto'],
      imagen: 'https://picsum.photos/800/600'
    },
    {
      id: 2,
      titulo: 'Visita Guiada a la Catedral de Baeza',
      descripcion: 'Descubre los secretos y la historia de la Catedral de Baeza con nuestros guías expertos.',
      fecha: new Date('2024-04-20'),
      lugar: 'Catedral de Baeza',
      ciudad: 'Baeza',
      categorias: ['Patrimonio', 'Visita Guiada'],
      imagen: 'https://picsum.photos/800/601'
    }
  ];

  filtroCiudad: string = '';
  filtroFecha: Date | null = new Date();
  filtroCategoria: string = '';
  categoriasDisponibles: string[] = [
    'Concierto', 'Visita Guiada', 'Taller', 'Gastronomía', 'Patrimonio', 'Música Clásica', 'Artesanía', 'Festival', 'Música Sacra', 'Música'
  ];
  eventosFiltrados: Evento[] = [];

  constructor() { }

  ngOnInit(): void {
    this.eventosFiltrados = this.eventos;
  }

  filtrarEventos(): void {
    this.eventosFiltrados = this.eventos.filter(e => {
      const ciudadOk = !this.filtroCiudad || e.ciudad === this.filtroCiudad;
      const fechaOk = !this.filtroFecha || (e.fecha && new Date(e.fecha).toDateString() === new Date(this.filtroFecha).toDateString());
      const catOk = !this.filtroCategoria || e.categorias.includes(this.filtroCategoria);
      return ciudadOk && fechaOk && catOk;
    });
  }
}
