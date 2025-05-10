import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { CategoriasListComponent } from './features/categorias/pages/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './features/categorias/pages/categorias-form/categorias-form.component';
import { EventosListComponent } from './features/dashboard/pages/eventos/eventos-list/eventos-list.component';
import { EventosFormComponent } from './features/dashboard/pages/eventos/eventos-form/eventos-form.component';
import { EventosPublicListComponent } from './features/eventos/eventos-public-list/eventos-public-list.component';

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
      { path: 'eventos', component: EventosListComponent },
      { path: 'eventos/nuevo', component: EventosFormComponent },
      { path: 'eventos/editar/:id', component: EventosFormComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
