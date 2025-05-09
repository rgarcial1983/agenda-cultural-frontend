import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PerfilService } from '../../features/perfil/services/perfil.service';

@NgModule({
  providers: [
    AuthService,
    PerfilService
  ]
})
export class ProvidersModule { } 