import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { ListadoLogsComponent } from './listado-logs/listado-logs.component';
import { EstadisticasAdminRoutingModule } from './estadisticas-admin-routing.module';
import { GraficoEspecialidadComponent } from './grafico-especialidad/grafico-especialidad.component';
import { TurnosPorDiaComponent } from './turnos-por-dia/turnos-por-dia.component';
import { TurnosPorPeriodoComponent } from './turnos-por-periodo/turnos-por-periodo.component';




@NgModule({
  declarations: [
    PageComponent,
    ListadoLogsComponent,
    GraficoEspecialidadComponent,
    TurnosPorDiaComponent,
    TurnosPorPeriodoComponent,

  ],
  imports: [
    CommonModule,
    EstadisticasAdminRoutingModule
  ]
})
export class EstadisticasAdminModule { }
