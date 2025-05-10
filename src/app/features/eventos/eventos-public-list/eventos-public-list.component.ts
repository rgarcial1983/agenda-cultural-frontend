import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EventosService, Evento } from '../eventos.service';

@Component({
  selector: 'app-eventos-public-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  providers: [EventosService],
  template: `
    <div class="public-eventos-container">
      <h1>Agenda de Eventos</h1>
      <div class="eventos-grid">
        <mat-card *ngFor="let evento of eventos" class="evento-card">
          <mat-card-header>
            <mat-card-title>{{ evento.titulo }}</mat-card-title>
            <mat-card-subtitle>
              <mat-icon>event</mat-icon> {{ evento.fecha | date:'dd/MM/yyyy' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ evento.descripcion }}</p>
            <p><mat-icon>place</mat-icon> {{ evento.lugar }}, {{ evento.ciudad }}</p>
            <div class="categorias">
              <span class="categoria" *ngFor="let cat of evento.categorias">
                <mat-icon>label</mat-icon> {{ cat }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `.public-eventos-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 24px;
      color: #222;
      font-size: 2rem;
      font-weight: 600;
    }
    .eventos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }
    .evento-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
    .categorias {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .categoria {
      background: #e3f2fd;
      color: #1976d2;
      border-radius: 16px;
      padding: 2px 10px;
      font-size: 0.95em;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `]
})
export class EventosPublicListComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.eventosService.getEventos().subscribe((resp: any) => {
      const eventos = Array.isArray(resp) ? resp : (Array.isArray(resp.content) ? resp.content : []);
      this.eventos = eventos.map((e: Evento) => ({
        ...e,
        categorias: Array.isArray(e.categorias)
          ? e.categorias.map((cat: any) => typeof cat === 'string' ? cat : cat.nombre)
          : []
      }));
    });
  }
  
}
