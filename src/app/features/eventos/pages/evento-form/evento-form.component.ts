import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{isEditMode ? 'Editar' : 'Nuevo'}} Evento</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="eventoForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Título</mat-label>
              <input matInput formControlName="titulo" required>
              <mat-error *ngIf="eventoForm.get('titulo')?.hasError('required')">
                El título es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="descripcion" rows="4" required></textarea>
              <mat-error *ngIf="eventoForm.get('descripcion')?.hasError('required')">
                La descripción es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Fecha</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="fecha" required>
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="eventoForm.get('fecha')?.hasError('required')">
                La fecha es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Lugar</mat-label>
              <input matInput formControlName="lugar" required>
              <mat-error *ngIf="eventoForm.get('lugar')?.hasError('required')">
                El lugar es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categoría</mat-label>
              <mat-select formControlName="categoria" required>
                <mat-option value="Música">Música</mat-option>
                <mat-option value="Arte">Arte</mat-option>
                <mat-option value="Teatro">Teatro</mat-option>
                <mat-option value="Danza">Danza</mat-option>
                <mat-option value="Literatura">Literatura</mat-option>
              </mat-select>
              <mat-error *ngIf="eventoForm.get('categoria')?.hasError('required')">
                La categoría es requerida
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/eventos">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="eventoForm.invalid">
                {{isEditMode ? 'Actualizar' : 'Crear'}} Evento
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
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
export class EventoFormComponent implements OnInit {
  eventoForm: FormGroup;
  isEditMode = false;
  eventoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.eventoId;

    if (this.isEditMode) {
      // Aquí cargaremos los datos del evento cuando implementemos los servicios
      this.eventoForm.patchValue({
        titulo: 'Concierto de Jazz',
        descripcion: 'Concierto de jazz en vivo',
        fecha: new Date('2024-04-15'),
        lugar: 'Teatro Municipal',
        categoria: 'Música'
      });
    }
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      // Aquí implementaremos la lógica de guardado cuando tengamos los servicios
      this.snackBar.open(
        `Evento ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`,
        'Cerrar',
        { duration: 3000 }
      );
      this.router.navigate(['/eventos']);
    }
  }
}
