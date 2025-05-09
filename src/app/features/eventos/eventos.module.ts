import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventosListComponent } from './pages/eventos-list/eventos-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventosListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EventosModule { }
