import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilViewComponent } from './pages/perfil-view/perfil-view.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilViewComponent
  },
  {
    path: 'editar',
    component: PerfilEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PerfilModule { }
