import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-categorias-form',
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
        <h1>{{ esEdicion ? 'Editar' : 'Nueva' }} Categoría</h1>
        <button mat-button routerLink="../">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="categoriaForm" (ngSubmit)="guardarCategoria()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre" placeholder="Nombre de la categoría">
              <mat-error *ngIf="categoriaForm.get('nombre')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="descripcion" rows="3" placeholder="Descripción de la categoría"></textarea>
              <mat-error *ngIf="categoriaForm.get('descripcion')?.hasError('required')">
                La descripción es requerida
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" routerLink="../">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="categoriaForm.invalid">
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
export class CategoriasFormComponent implements OnInit {
  categoriaForm: FormGroup;
  esEdicion = false;
  categoriaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.categoriaId = +params['id'];
        this.cargarCategoria(this.categoriaId);
      }
    });
  }

  cargarCategoria(id: number): void {
    // Aquí iría la lógica para cargar los datos de la categoría
    // Por ahora usamos datos de ejemplo
    const categoria = {
      id: id,
      nombre: 'Categoría de ejemplo',
      descripcion: 'Descripción de ejemplo'
    };
    
    this.categoriaForm.patchValue(categoria);
  }

  guardarCategoria(): void {
    if (this.categoriaForm.valid) {
      const categoria = this.categoriaForm.value;
      if (this.esEdicion) {
        // Aquí iría la lógica para actualizar la categoría
        console.log('Actualizando categoría:', { ...categoria, id: this.categoriaId });
      } else {
        // Aquí iría la lógica para crear una nueva categoría
        console.log('Creando nueva categoría:', categoria);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
} 