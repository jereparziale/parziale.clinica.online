import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccesosRapidosComponent } from './login/accesos-rapidos/accesos-rapidos.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RegisterComponent,LoginComponent,AccesosRapidosComponent],
  exports:[RegisterComponent],
  imports: [
    CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule, SharedModule
  ]
})
export class AuthModule { }
