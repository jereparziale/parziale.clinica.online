import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosPageComponent } from './usuarios-page/usuarios-page.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosPageComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  exports: [RouterModule],

})
export class UsuariosAdminRoutingModule { }
