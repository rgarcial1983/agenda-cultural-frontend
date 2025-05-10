import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventosService, Evento } from '../../../../eventos/eventos.service';

@Component({
  selector: 'app-eventos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    RouterModule
  ],
  providers: [EventosService],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-title>
          <mat-icon>event</mat-icon>
          {{ isEdit ? 'Editar' : 'Nuevo' }} Evento
        </mat-card-title>
        <mat-card-content>
          <form [formGroup]="eventoForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Título</mat-label>
              <input matInput formControlName="titulo" required>
              <mat-error *ngIf="eventoForm.get('titulo')?.hasError('required')">
                El título es obligatorio
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="descripcion" rows="3"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Fecha</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="fecha" required>
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="eventoForm.get('fecha')?.hasError('required')">
                La fecha es obligatoria
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Lugar</mat-label>
              <input matInput formControlName="lugar" required>
              <mat-error *ngIf="eventoForm.get('lugar')?.hasError('required')">
                El lugar es obligatorio
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Ciudad</mat-label>
              <input matInput formControlName="ciudad" required>
              <mat-error *ngIf="eventoForm.get('ciudad')?.hasError('required')">
                La ciudad es obligatoria
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categorías</mat-label>
              <mat-select formControlName="categorias" multiple>
                <mat-option *ngFor="let cat of categorias" [value]="cat.nombre">
                  {{cat.nombre}}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/admin/eventos">
                Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="eventoForm.invalid">
                {{ isEdit ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      color: rgba(0, 0, 0, 0.87);
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class EventosFormComponent implements OnInit {
  eventoForm: FormGroup;
  isEdit = false;
  eventoId: number | null = null;
  categorias = [
    { nombre: 'Concierto' },
    { nombre: 'Taller' },
    { nombre: 'Gastronomía' },
    { nombre: 'Patrimonio' },
    { nombre: 'Festival' },
    { nombre: 'Artesanía' },
    { nombre: 'Música Sacra' },
    { nombre: 'Visita Guiada' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventosService: EventosService
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      fecha: [null, Validators.required],
      lugar: ['', Validators.required],
      ciudad: ['', Validators.required],
      categorias: [[]]
    });
  }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEdit = !!this.eventoId;
    if (this.isEdit && this.eventoId) {
      this.eventosService.getEvento(this.eventoId).subscribe((evento: Evento) => {
        this.eventoForm.patchValue({
          ...evento,
          fecha: new Date(evento.fecha)
        });
      });
    }
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const formValue = this.eventoForm.value;
      const eventoPayload = {
        ...formValue,
        fecha: formValue.fecha instanceof Date ? formValue.fecha.toISOString().split('T')[0] : formValue.fecha
      };
      if (this.isEdit && this.eventoId) {
        this.eventosService.actualizarEvento(this.eventoId, eventoPayload).subscribe({
          next: () => {
            Swal.fire('Actualizado', 'El evento ha sido actualizado correctamente.', 'success');
            this.router.navigate(['/admin/eventos']);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el evento.', 'error');
          }
        });
      } else {
        this.eventosService.crearEvento(eventoPayload).subscribe({
          next: () => {
            Swal.fire('Creado', 'El evento ha sido creado correctamente.', 'success');
            this.router.navigate(['/admin/eventos']);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo crear el evento.', 'error');
          }
        });
      }
    }
  }
} 