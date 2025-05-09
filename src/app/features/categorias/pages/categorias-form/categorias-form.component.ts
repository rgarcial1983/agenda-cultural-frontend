import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-title>
          <mat-icon>category</mat-icon>
          {{ isEdit ? 'Editar' : 'Nueva' }} Categoría
        </mat-card-title>
        <mat-card-content>
          <form [formGroup]="categoriaForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre" required>
              <mat-error *ngIf="categoriaForm.get('nombre')?.hasError('required')">
                El nombre es obligatorio
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="descripcion" rows="3"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" routerLink="/admin/categorias">
                Cancelar
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="categoriaForm.invalid">
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
      max-width: 600px;
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
export class CategoriasFormComponent implements OnInit {
  categoriaForm: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    // Aquí iría la lógica para cargar los datos si estamos editando
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      console.log(this.categoriaForm.value);
      // Aquí iría la lógica para guardar los datos
    }
  }
} 