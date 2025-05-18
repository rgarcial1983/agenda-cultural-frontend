import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventosService, Evento } from '../../../../eventos/eventos.service';
import { LocalizacionesService, Localizacion } from '../../../services/localizaciones.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    MatAutocompleteModule,
    RouterModule
  ],
  providers: [EventosService, LocalizacionesService],
  template: `
    <div class="form-container">
      <div class="header">
        <h1>{{ isEdit ? 'Editar' : 'Nuevo' }} Evento</h1>
        <button mat-button (click)="volver()">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </button>
      </div>

      <mat-card>
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
              <mat-label>Ciudad</mat-label>
              <mat-select formControlName="ciudad" required>
                <mat-option value="Úbeda">Úbeda</mat-option>
                <mat-option value="Baeza">Baeza</mat-option>
              </mat-select>
              <mat-error *ngIf="eventoForm.get('ciudad')?.hasError('required')">
                La ciudad es obligatoria
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Lugar</mat-label>
              <input matInput [matAutocomplete]="auto" formControlName="lugar" required>
              <mat-autocomplete #auto="matAutocomplete">
                <mat-option *ngFor="let localizacion of localizacionesFiltradas" [value]="localizacion.lugar">
                  {{localizacion.lugar}}
                </mat-option>
              </mat-autocomplete>
              <mat-error *ngIf="eventoForm.get('lugar')?.hasError('required')">
                El lugar es obligatorio
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
              <button mat-button type="button" (click)="volver()">Cancelar</button>
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
export class EventosFormComponent implements OnInit, OnDestroy {
  eventoForm: FormGroup;
  isEdit = false;
  eventoId: number | null = null;
  localizaciones: Localizacion[] = [];
  localizacionesFiltradas: Localizacion[] = [];
  protected _onDestroy = new Subject<void>();

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
    private eventosService: EventosService,
    private localizacionesService: LocalizacionesService
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
    this.cargarLocalizaciones();
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

    // Configurar el filtro de localizaciones
    this.eventoForm.get('lugar')?.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(value => {
        this.filtrarLocalizaciones(value);
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  cargarLocalizaciones(): void {
    this.localizacionesService.getLocalizaciones().subscribe({
      next: (localizaciones) => {
        this.localizaciones = localizaciones;
        this.localizacionesFiltradas = localizaciones;
      },
      error: (error) => {
        console.error('Error al cargar localizaciones:', error);
        Swal.fire('Error', 'No se pudieron cargar las localizaciones', 'error');
      }
    });
  }

  filtrarLocalizaciones(value: string) {
    if (!value) {
      this.localizacionesFiltradas = this.localizaciones;
      return;
    }
    const searchValue = value.toLowerCase();
    this.localizacionesFiltradas = this.localizaciones.filter(localizacion => 
      localizacion.lugar.toLowerCase().includes(searchValue)
    );
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

  volver(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
} 
