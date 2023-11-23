import { Component } from '@angular/core';

@Component({
  selector: 'app-turnos-page',
  templateUrl: './turnos-page.component.html',
  styleUrls: ['./turnos-page.component.scss']
})
export class TurnosPageComponent {

  public filtrarProfesional:boolean=false;
  public filtrarEspecialidad:boolean=false;
  

  irProfesional(){
    this.filtrarProfesional=true;
  }
  irEspecialidad(){
    this.filtrarEspecialidad=true;
  }


}
