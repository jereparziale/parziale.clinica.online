import { Component, inject } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { Turno } from 'src/app/models/turno';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service'
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
@Component({
  selector: 'app-turnos-por-periodo',
  templateUrl: './turnos-por-periodo.component.html',
  styleUrls: ['./turnos-por-periodo.component.scss']
})
export class TurnosPorPeriodoComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);
  fechaSeleccionadaInicio: string='';
  fechaSeleccionadaFin: string='';
  especialistaSeleccionado: Especialista | undefined;
  cantidadTurnos: number=0;
  buscado:boolean=false;
  soloFinalizados:boolean=false;
  turnos:Turno[]=[]
  usuarios:Especialista[]=[]

  constructor(private TurnosService:TurnosService) {}
  
  ngOnInit(): void {
    this.usuarioService.todos('especialista').subscribe((data) => {
      this.usuarios = data;
    });
  }

  cargarFechaInicio(event: Event) {
    const select = event.target as HTMLSelectElement;
    const fechaISO = select.value; // Obtén la fecha en formato ISO (año-mes-día)
    this.fechaSeleccionadaInicio = this.formatearFecha(fechaISO);
  }
  cargarFechaFin(event: Event) {
    const select = event.target as HTMLSelectElement;
    const fechaISO = select.value; // Obtén la fecha en formato ISO (año-mes-día)
    this.fechaSeleccionadaFin = this.formatearFecha(fechaISO);
  }
  onCheckboxClick() {
    const checkbox = document.getElementById('flexSwitchCheckDefault') as HTMLInputElement;
    if(checkbox.checked){
      this.soloFinalizados=true;
    }else{
      this.soloFinalizados=false
    }
    console.log(checkbox.checked);
  }

  seleccionarEspecialista(especialista:Especialista){
    this.especialistaSeleccionado=especialista;
  }

  

  buscarTurnos(){
    if(this.fechaSeleccionadaInicio!=='' && this.fechaSeleccionadaFin!=='' && this.especialistaSeleccionado){
      if(!this.soloFinalizados){
        this.TurnosService.traerTurnosPorFechaRango(this.especialistaSeleccionado.mail,this.fechaSeleccionadaInicio,this.fechaSeleccionadaFin)
        .subscribe((res)=>{
          console.log(res);
          this.turnos=res;
          this.cantidadTurnos=this.turnos.length;
          this.buscado=true;

        })
      }else{
        this.TurnosService.traerTurnosFinalizadosPorFechaRango(this.especialistaSeleccionado.mail,this.fechaSeleccionadaInicio,this.fechaSeleccionadaFin)
        .subscribe((res)=>{
          console.log(res);
          this.turnos=res;
          this.cantidadTurnos=this.turnos.length;
          this.buscado=true;

        })
      }
    
    }
  }






  private formatearFecha(fechaISO: string) {
    const fecha = new Date(fechaISO + 'T00:00:00-03:00'); // UTC-3 es la zona horaria de Buenos Aires


    // Obtiene día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses comienzan desde 0
    const anio = fecha.getFullYear();

    // Formatea la fecha en el formato deseado
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return fechaFormateada;
  }
}