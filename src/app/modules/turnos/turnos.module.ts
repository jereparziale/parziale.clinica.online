import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosPageComponent } from './turnos-page/turnos-page.component';
import { TurnosRoutingModule } from './turnos-routing.module';
import { FormsModule } from '@angular/forms';
import { GrillaTurnosComponent } from './grilla-turnos/grilla-turnos.component';
import { FechaSprint2Pipe } from 'src/app/pipes/fecha-sprint2.pipe';




@NgModule({
  declarations: [
    TurnosPageComponent,
    GrillaTurnosComponent,
    FechaSprint2Pipe,

  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    FormsModule,

  ]
})
export class TurnosModule { }
