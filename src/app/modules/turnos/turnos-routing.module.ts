import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TurnosPageComponent } from './turnos-page/turnos-page.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'turnos',
    pathMatch: 'full'
  },
  {
    path: 'turnos',
    component: TurnosPageComponent
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
export class TurnosRoutingModule { }
