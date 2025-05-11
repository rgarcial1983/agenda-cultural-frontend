import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventosService, Evento } from '../eventos.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common'; // Para registrar locale si es necesario aquí


// Definir el formato de fecha dd/MM/yyyy
export const DD_MM_YYYY_Format = {
 parse: {
  dateInput: 'dd/MM/yyyy', // Corregido a minúsculas
 },
 display: {
  dateInput: 'dd/MM/yyyy', // Correcto
  monthYearLabel: 'MMMM yyyy', // Mejorado para mostrar año
  dateA11yLabel: 'dd/MM/yyyy', // Ajustado para consistencia
  monthYearA11yLabel: 'MMMM yyyy', // Mejorado
 },
};

@Component({
 selector: 'app-eventos-public-list',
 standalone: true,
 imports: [
  CommonModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule, // Necesitas MatNativeDateModule para usar MAT_DATE_FORMATS con fechas nativas
  FormsModule
 ],
 providers: [
  EventosService,
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format }
 ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer mode="over" class="sidenav">
        <mat-nav-list>
          <mat-list-item (click)="drawer.toggle()">Inicio</mat-list-item>
          <mat-list-item (click)="drawer.toggle()">Próximos eventos</mat-list-item>
          <mat-list-item (click)="drawer.toggle()">Contacto</mat-list-item>
          <!-- Añade más enlaces si necesitas -->
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="main-toolbar">
          <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
            <mat-icon>menu</mat-icon>
          </button>

          <img src="assets/images/logo.png" alt="Logo" class="app-logo" />
          <span class="app-title">Agenda Cultural</span>

          <span class="spacer"></span> <!-- Empuja el siguiente contenido a la derecha -->
        
        </mat-toolbar>

        <!-- Filtros -->
        <div class="filtros-container">
          <mat-form-field appearance="fill">
            <mat-label>Ciudad</mat-label>
            <mat-select [(value)]="filtroCiudad">
              <mat-option value="">Todas</mat-option>
              <mat-option *ngFor="let ciudad of ciudades" [value]="ciudad">{{ ciudad }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Categorías</mat-label>
            <mat-select [(value)]="filtroCategoria" multiple>
              <mat-option value="">Todas</mat-option>
              <mat-option *ngFor="let cat of todasCategorias" [value]="cat">{{ cat }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Fecha</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="filtroFecha">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="aplicarFiltros()">Filtrar</button>
          <button mat-raised-button (click)="resetFiltros()">Limpiar</button>
        </div>


        <!-- Tu contenido existente aquí -->
        <div class="public-eventos-container">
          

          <div *ngIf="eventos.length === 0 && !loading" class="no-eventos-message">
            <mat-icon>info</mat-icon> No hay eventos próximos en este momento. Vuelve a consultar más tarde.
          </div>

          <div *ngIf="loading" class="loading-indicator">
            Cargando eventos...
          </div>

          <div class="eventos-grid">
            <mat-card
              *ngFor="let evento of eventosFiltrados"
              class="evento-card"
              [class.evento-finalizado]="esEventoFinalizado(evento.fecha)" >
              <img *ngIf="evento.imagenurl" mat-card-image [src]="evento.imagenurl" alt="Imagen del evento {{ evento.titulo }}">

              <mat-card-header>
                <mat-card-title>{{ evento.titulo }}</mat-card-title>
                <mat-card-subtitle>
                  <span *ngIf="evento.fecha" class="fecha-evento">
                    <mat-icon class="icon-large" color="accent">event</mat-icon> {{ evento.fecha | date:'dd/MM/yyyy' }}
                  </span>
                  <span *ngIf="evento.hora" class="hora-evento">
                    <mat-icon class="icon-large" color="accent">schedule</mat-icon> {{ evento.hora }}
                  </span>
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <p>{{ evento.descripcion }}</p>
                <p><mat-icon class="icon-large" color="primary">place</mat-icon> {{ evento.lugar }}, {{ evento.ciudad }}</p>

                <div class="categorias">
                  <span class="categoria"
                        *ngFor="let cat of evento.categorias"
                        [style.backgroundColor]="getCategoryColor(cat)?.background || '#6c757d'" [style.color]="getCategoryColor(cat)?.color || '#fff'">
                    <mat-icon>category</mat-icon> {{ cat }}
                  </span>
                </div>
                </mat-card-content>

              <mat-card-actions class="center-button">
                <button mat-flat-button color="primary">
                  <mat-icon>read_more</mat-icon> Más Detalles
                </button>
              </mat-card-actions>

              </mat-card>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    .public-eventos-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .main-toolbar {
      display: flex;
      align-items: center;
      padding: 0 16px;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .app-logo {
      height: 40px;
      margin-right: 16px;
    }

    .app-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: white;
    }

    @media (max-width: 600px) {
      .app-title {
        font-size: 1.2rem;
      }

      .app-logo {
        height: 32px;
        margin-right: 8px;
      }

      .main-toolbar {
        padding: 0 8px;
      }
    }

    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .menu-button {
      margin-right: 16px;
      display: none;
    }

    @media (max-width: 768px) {
      .menu-button {
        display: inline-flex;
      }

      .app-title {
        font-size: 1.2rem;
      }

      .app-logo {
        height: 32px;
      }
    }


    h1 {
      margin-bottom: 24px;
      color: #222;
      font-size: 2.2rem; /* Ligeramente más grande */
      font-weight: 700; /* Más negrita */
      text-align: center; /* Centrar título principal */
    }
    .eventos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Ajustar minmax si lo ves mejor */
      gap: 24px;
    }
    .evento-card {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* Sombra un poco más pronunciada */
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Añadir transición para hover */      
      position: relative; /* Necesario para posicionar el ::before/::after */
      overflow: hidden; /* Asegura que el contenido superpuesto no se salga de la card */
      display: flex; /* Usar flexbox para organizar el contenido verticalmente */
      flex-direction: column; /* Apilar elementos verticalmente */
      justify-content: space-between; /* Distribuye el espacio, empujando las acciones hacia abajo */
    }
    .evento-card:hover {
      transform: translateY(-5px); /* Efecto ligero al pasar el ratón */
      box-shadow: 0 6px 15px rgba(0,0,0,0.15); /* Sombra más intensa al pasar el ratón */
    }

    /* ESTILO PARA FIJAR LA ALTURA DE LA IMAGEN EN LA CARD */
    .evento-card img[mat-card-image] {
       height: 200px; /* Define una altura fija */
       object-fit: cover; /* Asegura que la imagen cubra el área */
       width: 100%; /* Ocupa todo el ancho disponible */
    }
    /* FIN ESTILO IMAGEN */
    .mat-card-header .mat-card-title {
       font-size: 1.25em; /* Ajustar tamaño del título de la card */
       font-weight: 600;
    }
    .mat-card-header .mat-card-subtitle {
       font-size: 0.9em; /* Ajustar tamaño del subtítulo (fecha) */
       color: #555;
       display: flex; /* Usar flexbox para alinear icono y texto */
       align-items: center;
    }
     /* ESTILO PARA ICONOS NORMALES EN EL SUBTÍTULO (tamaño por defecto si no tienen .icon-large) */
    .mat-card-subtitle .mat-icon {
        /* Estos estilos se aplican a mat-icon dentro de mat-card-subtitle */
        font-size: 18px;
        margin-right: 4px;
        height: 18px;
        width: 18px;
        vertical-align: middle; /* Para alineación */
    }
    .mat-card-content {
        /* Permite que el contenido ocupe el espacio disponible, empujando las acciones abajo */
        flex-grow: 1;
        /* padding-bottom: 0 !important; /* Opcional: quitar el padding inferior por defecto si lo manejas en mat-card-actions */
    }
    .mat-card-content p {
       margin-bottom: 10px; /* Espacio entre párrafos */
       line-height: 1.5; /* Interlineado para mejor lectura */
    }
    /* ESTILO PARA ICONOS NORMALES EN EL CONTENIDO (tamaño por defecto si no tienen .icon-large) */
    .mat-card-content .mat-icon {
        /* Estos estilos se aplican a mat-icon dentro de mat-card-content */
        font-size: 18px;
        margin-right: 4px;
        height: 18px;
        width: 18px;
        vertical-align: middle; /* Para alineación */
     }


    /* ESTILO PARA ICONOS MÁS GRANDES (aplica si la clase .icon-large está presente) */
    .icon-large {
        font-size: 24px !important; /* Usa !important si hay conflictos de especificidad, aunque no debería ser necesario */
        height: 24px !important;
        width: 24px !important;
        margin-right: 8px !important; /* Ajusta el margen para que coincida con el nuevo tamaño */
        vertical-align: middle !important; /* Asegura la alineación */
    }
    /* FIN ESTILO ICONOS MÁS GRANDES */


    /* ESTILOS DE BADGE AL ESTILO BOOTSTRAP PARA CATEGORÍAS */
    .categorias {
      margin-top: 15px;
      margin-bottom: 20px; /* Espacio entre categorías y el botón */
      display: flex;
      flex-wrap: wrap;
      gap: 8px; /* Espacio entre badges individuales */
      justify-content: flex-start;
      /* ... otras propiedades de .categorias ... */
    }
    .categoria {
      /* Colores de fondo y texto ahora se aplican dinámicamente via [style] */
      border-radius: 0.25rem; /* radio de borde pequeño similar a Bootstrap */
      padding: 0.25em 0.5em; /* padding similar a Bootstrap (usa em para escalar con fuente) */
      font-size: 0.75em; /* tamaño de fuente más pequeño similar a Bootstrap */
      font-weight: 700; /* negrita */
      display: inline-flex; /* Usar inline-flex para que se comporte como un elemento inline pero con flexbox */
      align-items: center;
      gap: 4px;
      white-space: nowrap; /* Previene que el texto del badge se rompa */
      text-transform: uppercase; /* Opcional: Poner el texto en mayúsculas */
      vertical-align: middle; /* Alinea verticalmente si está en línea con texto */
    }
    .categoria mat-icon {
       font-size: 12px; /* Icono aún más pequeño dentro del badge */
       height: 12px;
       width: 12px;
       margin-right: 4px; /* Espacio entre el icono y el texto */
       /* Color del icono ahora se aplica dinámicamente via [style] en el padre,
          pero a veces es necesario asegurarlo aquí si el color del padre no lo hereda */
       /* color: inherit; */
       vertical-align: middle; /* Para alineación */
    }
    /* FIN ESTILOS DE BADGE */


   /* Estilo para acciones (botones) si los añades */
   .mat-card-actions {
       padding: 0 5px 0px 5px; /* Padding inferior y lateral - Ajusta a 16px */
   }

   /* Estilo para centrar acciones en la card */
   .mat-card-actions.center-button {
       display: flex; /* mat-card-actions ya suele ser un flex container */
       justify-content: center; /* Centra horizontalmente su contenido (el botón) */
       align-items: center; /* Centra verticalmente si fuera necesario */
       /* No sobrescribas el padding si ya lo definiste arriba */
   }


   .evento-finalizado {
     opacity: 0.8; /* Ajusta la opacidad si lo deseas */
   }
   /* Texto superpuesto para eventos finalizados */
   .evento-finalizado::before {
      content: 'FINALIZADO'; /* Texto a mostrar */
      position: absolute;
      top: 10px; /* Ajusta la posición vertical */
      right: 10px; /* Ajusta la posición horizontal */
      background: rgba(0, 0, 0, 0.6); /* Fondo semitransparente oscuro */
      color: white;
      padding: 4px 12px; /* Padding dentro de la etiqueta */
      border-radius: 4px; /* Bordes redondeados */
      font-size: 0.9em; /* Tamaño de fuente */
      font-weight: 700; /* Negrita */
      z-index: 1; /* Asegura que esté por encima del contenido */
      pointer-events: none; /* Permite que los clics pasen a la card subyacente */
    }

    /* Estilos para el mensaje de no eventos */
    .no-eventos-message {
      text-align: center;
      padding: 40px 20px;
      color: #555;
      font-size: 1.1em;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .no-eventos-message mat-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        color: #999;
    }

    /* Estilo opcional para indicador de carga */
    .loading-indicator {
        text-align: center;
        padding: 20px;
        font-style: italic;
        color: #777;
    }

    .fecha-evento,
    .hora-evento {
        display: inline-flex; /* Convierte el span en un contenedor flex, pero sigue la línea */
        align-items: center; /* Alinea verticalmente los elementos hijos (icono y texto) al centro */        
        margin-right: 16px; /* Opcional: Añade espacio entre el bloque de fecha y el de hora */
    }

    .spacer {
      flex: 1 1 auto;
    }

    .ciudad-select {
      min-width: 140px;
      max-width: 200px;
      margin-right: 16px;
    }

    @media (max-width: 768px) {
      .ciudad-select {
        min-width: 100px;
        font-size: 0.85rem;
      }
    }

    /* Filtros */
    .filtros-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      padding: 16px;
      margin-bottom: 24px;
    }


    .filtro-container mat-form-field {
      min-width: 200px;
      flex: 1;
    }


   `
  ]
})


export class EventosPublicListComponent implements OnInit {
   eventos: Evento[] = [];
   loading: boolean = true; // Añadir estado de carga
  
   // Mapa de colores para categorías (puedes expandirlo con más categorías y colores)
   private categoryColors: { [key: string]: { background: string, color: string } } = {
    'Música': { background: '#007bff', color: '#fff' }, // Estilo Bootstrap Primary
    'Teatro': { background: '#dc3545', color: '#fff' }, // Estilo Bootstrap Danger
    'Arte': { background: '#ffc107', color: '#212529' }, // Estilo Bootstrap Warning (texto oscuro)
    'Deporte': { background: '#28a745', color: '#fff' }, // Estilo Bootstrap Success
    'Conferencia': { background: '#6c757d', color: '#fff' }, // Estilo Bootstrap Secondary
    'Infantil': { background: '#17a2b8', color: '#fff' }, // Estilo Bootstrap Info
    'Cine': { background: '#f8f9fa', color: '#212529' }, // Estilo Bootstrap Light (texto oscuro)
    'Gastronomía': { background: '#343a40', color: '#fff' }, // Estilo Bootstrap Dark
    // Añade más mapeos según las categorías que manejes
   };
  
   // Propiedades para filtros
   filtroCiudad: string = '';
   filtroCategoria: string[] = [];
   filtroFecha: Date | null = null;
   eventosFiltrados: Evento[] = [];
  
    // Asegúrate de que estas propiedades estén definidas si las usas en el template/lógica de filtrado
    ciudades: string[] = ['Úbeda', 'Baeza']; // Ejemplo, obtén esto de tu API si es dinámico
    todasCategorias: string[] = []; // Se rellena al cargar eventos
  
  
   constructor(
    private eventosService: EventosService,
    // private router: Router // Descomenta si usas la navegación al hacer clic
   ) {
        // Opcional: Registrar el locale aquí si no está registrado globalmente
        // registerLocaleData(localeEs);
    }
  
   ngOnInit(): void {
    this.loading = true; // Iniciar carga
    this.eventosService.getEventos().subscribe({
     next: (resp: any) => {
      const eventos = Array.isArray(resp) ? resp : (Array.isArray(resp.content) ? resp.content : []);
      this.eventos = eventos.map((e: any) => ({
       ...e,
       // Asegúrate de que 'fecha' sea un string parseable por new Date() o un objeto Date
       // Si la API devuelve la fecha en otro formato, conviértela aquí.
       // Ejemplo si la API devuelve un timestamp: fecha: new Date(e.fechaTimestamp * 1000)
       lugar: e.localizacion?.lugar || '',
       ciudad: e.ciudad?.nombre || '',
       categorias: Array.isArray(e.categorias)
        ? e.categorias.map((cat: any) => typeof cat === 'string' ? cat : cat.nombre)
        : []
       // imagenurl: e.imagenUrl || e.imagenurl // Puedes mantenerlo si necesitas esta lógica
      }));
      // Opcional: Ordenar los eventos por fecha después de recibirlos
      this.eventos = this.eventos.sort((a, b) => {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        return dateA - dateB; // Orden ascendente por fecha
      });
  
      // Rellenar todasCategorias al cargar los eventos
      this.todasCategorias = Array.from(
       new Set(this.eventos.flatMap(e => e.categorias))
      ).sort();
  
      this.eventosFiltrados = [...this.eventos]; // Inicializar eventosFiltrados
      this.loading = false; // Finalizar carga
     },
     error: (err) => {
      console.error('Error al obtener eventos:', err);
      this.loading = false; // Finalizar carga incluso en error
      // Opcional: mostrar un mensaje de error al usuario
     }
    });
   }
  
   /**
   * Determina si la fecha de un evento ya ha pasado.
   * @param fecha La fecha del evento en formato string o Date.
   * @returns True si el evento ya ha pasado, false en caso contrario.
   */
   esEventoFinalizado(fecha: string | Date): boolean {
    if (!fecha) {
     return false; // Si no hay fecha, no se considera finalizado
    }
    try {
      const fechaEvento = new Date(fecha);
      const hoy = new Date();
      // Para comparar solo por día, poner la hora de hoy a medianoche
      hoy.setHours(0, 0, 0, 0);
      // Comparamos la fecha del evento (también puesta a medianoche si es Date)
      if (fechaEvento instanceof Date && !isNaN(fechaEvento.getTime())) {
        fechaEvento.setHours(0, 0, 0, 0);
        return fechaEvento < hoy;
      } else if (typeof fecha === 'string') {
        // Intentar parsear el string. Depende del formato de la API.
        // Si el formato no es estándar (YYYY-MM-DD), podrías necesitar una librería como date-fns o moment.js
        const parsedDate = new Date(fecha);
        if (!isNaN(parsedDate.getTime())) {
          parsedDate.setHours(0, 0, 0, 0);
          return parsedDate < hoy;
        }
      }
      return false; // Si no se pudo parsear la fecha, no se considera finalizado
    } catch (e) {
      console.error("Error parseando fecha:", fecha, e);
      return false; // En caso de error al parsear, no se considera finalizado
    }
   }
  
   /**
   * Obtiene los colores de fondo y texto para una categoría específica.
   * Si la categoría no está mapeada, devuelve colores por defecto.
   * @param categoryName El nombre de la categoría.
   * @returns Un objeto con background y color, o undefined si no se encuentra.
   */
   getCategoryColor(categoryName: string): { background: string, color: string } | undefined {
     // Puedes normalizar el nombre de la categoría si la API devuelve inconsistencias (ej: "musica" vs "Música")
      const normalizedCategory = categoryName.trim(); // .toLowerCase() si quieres ignorar mayúsculas/minúsculas
        return this.categoryColors[normalizedCategory];
  }
  
  
  // Opcional: Método para manejar el clic en la card y navegar
  // verDetallesEvento(id: number): void {
  //  this.router.navigate(['/eventos/detalle', id]);
  // }
  
  
    aplicarFiltros() {
      this.eventosFiltrados = this.eventos.filter(evento => {
        const coincideCiudad = !this.filtroCiudad || evento.ciudad === this.filtroCiudad;
        const coincideCategoria =
        this.filtroCategoria.length === 0 ||
        this.filtroCategoria.some(cat => evento.categorias.includes(cat));
        const coincideFecha =
        !this.filtroFecha || new Date(evento.fecha).toDateString() === this.filtroFecha.toDateString();
  
        return coincideCiudad && coincideCategoria && coincideFecha;
      });
   }
  
   resetFiltros() {
    this.filtroCiudad = '';
    this.filtroCategoria = [];
    this.filtroFecha = null;
    this.eventosFiltrados = [...this.eventos];
   }
  
  
  }