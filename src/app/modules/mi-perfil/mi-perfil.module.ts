import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiPerfilPageComponent } from './mi-perfil-page/mi-perfil-page.component';
import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MiPerfilPageComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    SharedModule
  ]
})
export class MiPerfilModule { }
