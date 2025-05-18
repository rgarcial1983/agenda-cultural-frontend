import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Localizacion {
  id: number;
  lugar: string;
  enlaceGoogleMaps: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {
  private apiUrl = 'http://localhost:8080/api/localizaciones';

  constructor(private http: HttpClient) {}

  getLocalizaciones(): Observable<Localizacion[]> {
    return this.http.get<Localizacion[]>(this.apiUrl);
  }

  getLocalizacion(id: number): Observable<Localizacion> {
    return this.http.get<Localizacion>(`${this.apiUrl}/${id}`);
  }

  crearLocalizacion(localizacion: Omit<Localizacion, 'id'>): Observable<Localizacion> {
    return this.http.post<Localizacion>(this.apiUrl, localizacion);
  }

  actualizarLocalizacion(id: number, localizacion: Partial<Localizacion>): Observable<Localizacion> {
    return this.http.put<Localizacion>(`${this.apiUrl}/${id}`, localizacion);
  }

  eliminarLocalizacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 