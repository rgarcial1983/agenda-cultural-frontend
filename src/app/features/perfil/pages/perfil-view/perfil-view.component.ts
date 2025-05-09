import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PerfilService, PerfilUsuario } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="perfil-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Mi Perfil</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="perfil-info" *ngIf="perfil">
            <div class="info-row">
              <span class="label">Usuario:</span>
              <span class="value">{{perfil.username}}</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{perfil.email}}</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="info-row">
              <span class="label">Nombre:</span>
              <span class="value">{{perfil.nombre}} {{perfil.apellidos}}</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="info-row">
              <span class="label">Teléfono:</span>
              <span class="value">{{perfil.telefono}}</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="info-row">
              <span class="label">Fecha de Registro:</span>
              <span class="value">{{perfil.fechaRegistro | date:'dd/MM/yyyy'}}</span>
            </div>
            <mat-divider></mat-divider>
            
            <div class="info-row">
              <span class="label">Último Acceso:</span>
              <span class="value">{{perfil.ultimoAcceso | date:'dd/MM/yyyy HH:mm'}}</span>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/perfil/editar">
            <mat-icon>edit</mat-icon>
            Editar Perfil
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .perfil-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .perfil-info {
      padding: 20px 0;
    }

    .info-row {
      display: flex;
      padding: 12px 0;
    }

    .label {
      font-weight: 500;
      width: 150px;
      color: rgba(0, 0, 0, 0.6);
    }

    .value {
      flex: 1;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class PerfilViewComponent implements OnInit {
  perfil: PerfilUsuario | null = null;

  constructor(
    private perfilService: PerfilService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.perfilService.obtenerPerfil().subscribe({
      next: (perfil) => {
        this.perfil = perfil;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
        this.snackBar.open('Error al cargar el perfil', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
