import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasListComponent } from './pages/categorias-list/categorias-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoriasListComponent
  ]
})
export class CategoriasModule { } 