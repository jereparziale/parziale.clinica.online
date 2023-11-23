import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosPageComponent } from './mis-turnos-page/mis-turnos-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { CargarAtencionComponent } from './cargar-atencion/cargar-atencion.component';



@NgModule({
  declarations: [MisTurnosPageComponent, FiltrarComponent, MisTurnosComponent, CargarAtencionComponent,
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MisTurnosModule { } 
