import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosPageComponent } from './turnos-page/turnos-page.component';
import { TurnosRoutingModule } from './turnos-routing.module';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { FormsModule } from '@angular/forms';
import { GrillaTurnosComponent } from './grilla-turnos/grilla-turnos.component';



@NgModule({
  declarations: [
    TurnosPageComponent,
    FiltrarComponent,
    GrillaTurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    FormsModule,

  ]
})
export class TurnosModule { }
