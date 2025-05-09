import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventosListComponent } from './eventos-list/eventos-list.component';
import { EventoFormComponent } from './evento-form/evento-form.component';

const routes: Routes = [
  {
    path: '',
    component: EventosListComponent
  },
  {
    path: 'nuevo',
    component: EventoFormComponent
  },
  {
    path: 'editar/:id',
    component: EventoFormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EventosListComponent,
    EventoFormComponent
  ]
})
export class EventosModule { } 