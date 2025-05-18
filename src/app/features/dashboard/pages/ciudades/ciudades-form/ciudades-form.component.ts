import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Ciudad {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-ciudades-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ esEdicion ? 'Editar' : 'Nueva' }} Ciudad</h1>
        <button mat-button routerLink="../">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="ciudadForm" (ngSubmit)="guardarCiudad()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre" placeholder="Nombre de la ciudad">
              <mat-error *ngIf="ciudadForm.get('nombre')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" routerLink="../">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="ciudadForm.invalid">
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
export class CiudadesFormComponent implements OnInit {
  ciudadForm: FormGroup;
  esEdicion = false;
  ciudadId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.ciudadForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.ciudadId = +params['id'];
        this.cargarCiudad(this.ciudadId);
      }
    });
  }

  cargarCiudad(id: number): void {
    this.http.get<Ciudad>(`http://localhost:8080/api/ciudades/${id}`).subscribe({
      next: (ciudad) => {
        this.ciudadForm.patchValue(ciudad);
      },
      error: (error) => {
        console.error('Error al cargar la ciudad:', error);
        Swal.fire('Error', 'No se pudo cargar la ciudad', 'error');
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  guardarCiudad(): void {
    if (this.ciudadForm.valid) {
      const ciudad = this.ciudadForm.value;
      
      if (this.esEdicion && this.ciudadId) {
        this.http.put<Ciudad>(`http://localhost:8080/api/ciudades/${this.ciudadId}`, ciudad).subscribe({
          next: () => {
            Swal.fire('¡Actualizada!', 'La ciudad ha sido actualizada correctamente.', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error('Error al actualizar la ciudad:', error);
            Swal.fire('Error', 'No se pudo actualizar la ciudad', 'error');
          }
        });
      } else {
        this.http.post<Ciudad>('http://localhost:8080/api/ciudades', ciudad).subscribe({
          next: () => {
            Swal.fire('¡Creada!', 'La ciudad ha sido creada correctamente.', 'success');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error('Error al crear la ciudad:', error);
            Swal.fire('Error', 'No se pudo crear la ciudad', 'error');
          }
        });
      }
    }
  }
} 