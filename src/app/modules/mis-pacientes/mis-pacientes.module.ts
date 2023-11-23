import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MisPacientesRoutingModule } from './mis-pacientes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule
    ,MisPacientesRoutingModule,
    SharedModule
  ]
})
export class MisPacientesModule { }
