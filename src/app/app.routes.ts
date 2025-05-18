import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { CategoriasListComponent } from './features/dashboard/pages/categorias/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './features/dashboard/pages/categorias/categorias-form/categorias-form.component';
import { EventosListComponent } from './features/dashboard/pages/eventos/eventos-list/eventos-list.component';
import { EventosFormComponent } from './features/dashboard/pages/eventos/eventos-form/eventos-form.component';
import { EventosPublicListComponent } from './features/eventos/eventos-public-list/eventos-public-list.component';
import { CiudadesListComponent } from './features/dashboard/pages/ciudades/ciudades-list/ciudades-list.component';
import { CiudadesFormComponent } from './features/dashboard/pages/ciudades/ciudades-form/ciudades-form.component';
import { LocalizacionesListComponent } from './features/dashboard/pages/localizaciones/localizaciones-list/localizaciones-list.component';
import { LocalizacionesFormComponent } from './features/dashboard/pages/localizaciones/localizaciones-form/localizaciones-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'eventos', component: EventosPublicListComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categorias', component: CategoriasListComponent },
      { path: 'categorias/nueva', component: CategoriasFormComponent },
      { path: 'categorias/editar/:id', component: CategoriasFormComponent },
      { path: 'ciudades', component: CiudadesListComponent },
      { path: 'ciudades/nueva', component: CiudadesFormComponent },
      { path: 'ciudades/editar/:id', component: CiudadesFormComponent },
      { path: 'eventos', component: EventosListComponent },
      { path: 'eventos/nuevo', component: EventosFormComponent },
      { path: 'eventos/editar/:id', component: EventosFormComponent },
      { path: 'localizaciones', component: LocalizacionesListComponent },
      { path: 'localizaciones/nueva', component: LocalizacionesFormComponent },
      { path: 'localizaciones/editar/:id', component: LocalizacionesFormComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
