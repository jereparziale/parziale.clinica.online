import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosPageComponent } from './usuarios-page/usuarios-page.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { UsuariosAdminRoutingModule } from './usuarios-admin-routing.module';
import { TrueFalsePipe } from 'src/app/pipes/true-false.pipe';



@NgModule({
  declarations: [
    UsuariosPageComponent,
    ListadoUsuariosComponent,
    TrueFalsePipe
  ],
  imports: [
    CommonModule,
    AuthModule,
    SharedModule,
    UsuariosAdminRoutingModule,
  ]
})
export class UsuariosAdminModule { }
