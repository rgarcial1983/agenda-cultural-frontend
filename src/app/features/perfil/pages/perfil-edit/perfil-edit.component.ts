import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="perfil-edit-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Editar Perfil</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="perfilForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre" required>
              <mat-error *ngIf="perfilForm.get('nombre')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Apellidos</mat-label>
              <input matInput formControlName="apellidos" required>
              <mat-error *ngIf="perfilForm.get('apellidos')?.hasError('required')">
                Los apellidos son requeridos
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" required type="email">
              <mat-error *ngIf="perfilForm.get('email')?.hasError('required')">
                El email es requerido
              </mat-error>
              <mat-error *ngIf="perfilForm.get('email')?.hasError('email')">
                Ingrese un email válido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Teléfono</mat-label>
              <input matInput formControlName="telefono" required>
              <mat-error *ngIf="perfilForm.get('telefono')?.hasError('required')">
                El teléfono es requerido
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!perfilForm.valid">
                <mat-icon>save</mat-icon>
                Guardar Cambios
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .perfil-edit-container {
      padding: 20px;
      max-width: 600px;
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
export class PerfilEditComponent implements OnInit {
  perfilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.perfilService.obtenerPerfil().subscribe({
      next: (perfil) => {
        this.perfilForm.patchValue({
          nombre: perfil.nombre,
          apellidos: perfil.apellidos,
          email: perfil.email,
          telefono: perfil.telefono
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos del perfil:', error);
        this.snackBar.open('Error al cargar los datos del perfil', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.perfilService.actualizarPerfil(this.perfilForm.value).subscribe({
        next: () => {
          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/perfil']);
        },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          this.snackBar.open('Error al actualizar el perfil', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/perfil']);
  }
}
