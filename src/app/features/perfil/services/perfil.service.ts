import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PerfilUsuario {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaRegistro: Date;
  ultimoAcceso: Date;
}

export interface PerfilUpdateDTO {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = `${environment.apiUrl}/perfil`;

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<PerfilUsuario> {
    return this.http.get<PerfilUsuario>(this.apiUrl);
  }

  actualizarPerfil(datos: PerfilUpdateDTO): Observable<PerfilUsuario> {
    return this.http.put<PerfilUsuario>(this.apiUrl, datos);
  }

  cambiarPassword(passwordActual: string, passwordNueva: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cambiar-password`, {
      passwordActual,
      passwordNueva
    });
  }
} 