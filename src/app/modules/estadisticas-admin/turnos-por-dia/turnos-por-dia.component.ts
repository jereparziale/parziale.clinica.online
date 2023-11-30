import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { Turno } from 'src/app/models/turno';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service'

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.scss']
})
export class TurnosPorDiaComponent {
  fechaSeleccionada: string='';
  cantidadTurnos: number=0;
  turnos:Turno[]=[]

  constructor(private TurnosService:TurnosService) {}
  
  ngOnInit(){
  } 

  buscarTurnos(event: Event) {
    const select = event.target as HTMLSelectElement;
    const fechaISO = select.value; // Obtén la fecha en formato ISO (año-mes-día)
  
    // Convierte la fecha ISO a la zona horaria de Buenos Aires
    const fecha = new Date(fechaISO + 'T00:00:00-03:00'); // UTC-3 es la zona horaria de Buenos Aires
  
    // Obtiene día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses comienzan desde 0
    const anio = fecha.getFullYear();
  
    // Formatea la fecha en el formato deseado
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  
    this.fechaSeleccionada = fechaFormateada;
    console.log(this.fechaSeleccionada);
  
    this.TurnosService.traerPorFecha(this.fechaSeleccionada).subscribe((res) => {
      this.turnos = res;
      this.cantidadTurnos = this.turnos.length;
      console.log(res);
    });
  }
}
 