import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    CaptchaComponent,
  ],
  exports: [HistoriaClinicaComponent,CaptchaComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
