import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosPageComponent } from './usuarios-page/usuarios-page.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { UsuariosAdminRoutingModule } from './usuarios-admin-routing.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UsuariosPageComponent,
    ListadoUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosAdminRoutingModule,
    AuthModule,
    SharedModule
  ]
})
export class UsuariosAdminModule { }
