import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalizacionesService } from '../../../services/localizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localizaciones-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ esEdicion ? 'Editar' : 'Nueva' }} Localización</h1>
        <button mat-button (click)="volver()">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="localizacionForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Lugar</mat-label>
              <input matInput formControlName="lugar" placeholder="Ingrese el lugar">
              <mat-error *ngIf="localizacionForm.get('lugar')?.hasError('required')">
                El lugar es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Enlace Google Maps</mat-label>
              <input matInput formControlName="enlaceGoogleMaps" placeholder="Ingrese el enlace de Google Maps">
              <mat-error *ngIf="localizacionForm.get('enlaceGoogleMaps')?.hasError('required')">
                El enlace es requerido
              </mat-error>
              <mat-error *ngIf="localizacionForm.get('enlaceGoogleMaps')?.hasError('pattern')">
                Ingrese una URL válida
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" (click)="volver()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="localizacionForm.invalid">
                {{ esEdicion ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
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

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class LocalizacionesFormComponent implements OnInit {
  localizacionForm: FormGroup;
  esEdicion = false;
  localizacionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private localizacionesService: LocalizacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.localizacionForm = this.fb.group({
      lugar: ['', Validators.required],
      enlaceGoogleMaps: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.localizacionId = +id;
      this.cargarLocalizacion(this.localizacionId);
    }
  }

  cargarLocalizacion(id: number): void {
    this.localizacionesService.getLocalizacion(id).subscribe({
      next: (localizacion) => {
        this.localizacionForm.patchValue({
          lugar: localizacion.lugar,
          enlaceGoogleMaps: localizacion.enlaceGoogleMaps
        });
      },
      error: (error) => {
        console.error('Error al cargar la localización:', error);
        Swal.fire('Error', 'No se pudo cargar la localización', 'error');
        this.volver();
      }
    });
  }

  onSubmit(): void {
    if (this.localizacionForm.valid) {
      const localizacion = this.localizacionForm.value;
      
      if (this.esEdicion && this.localizacionId) {
        this.localizacionesService.actualizarLocalizacion(this.localizacionId, localizacion).subscribe({
          next: () => {
            Swal.fire('¡Actualizada!', 'La localización ha sido actualizada correctamente.', 'success');
            this.volver();
          },
          error: (error) => {
            console.error('Error al actualizar la localización:', error);
            Swal.fire('Error', 'No se pudo actualizar la localización', 'error');
          }
        });
      } else {
        this.localizacionesService.crearLocalizacion(localizacion).subscribe({
          next: () => {
            Swal.fire('¡Creada!', 'La localización ha sido creada correctamente.', 'success');
            this.volver();
          },
          error: (error) => {
            console.error('Error al crear la localización:', error);
            Swal.fire('Error', 'No se pudo crear la localización', 'error');
          }
        });
      }
    }
  }

  volver(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
} 