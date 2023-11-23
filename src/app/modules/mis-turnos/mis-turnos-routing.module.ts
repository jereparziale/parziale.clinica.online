import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosPageComponent } from './mis-turnos-page/mis-turnos-page.component';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { CargarAtencionComponent } from './cargar-atencion/cargar-atencion.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'turnos',
    pathMatch: 'full'
  },
  {
    path: 'turnos',
    component: MisTurnosPageComponent
  },
  {
    path: 'cargarAtencion',
    component: CargarAtencionComponent
  },

];
@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
  ],
  exports: [RouterModule],

})
export class MisTurnosRoutingModule { }
