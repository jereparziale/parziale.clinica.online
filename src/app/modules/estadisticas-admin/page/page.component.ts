import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { Turno } from 'src/app/models/turno';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service'


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  constructor(private EspecialidadService:EspecialidadService,
    private TurnosService:TurnosService) {}
  
  public mostrarLogs:boolean=false;
  public mostrarGraficoEspecialidad:boolean=false;
  public mostrarTurnosPorDia:boolean=false;
  public mostrarTurnosPorPeriodo:boolean=false;

  // ngOnInit(){

  //   this.EspecialidadService.todos().subscribe((res)=>{
  //     this.especialidades = res;
  //     this.TurnosService.todos().subscribe((res)=>{
  //       this.turnos = res;
        
  //     })
  //   })
   


  // }


  listarLogs(){
    this.mostrarGraficoEspecialidad = false;
    this. mostrarTurnosPorDia=false;
    this.mostrarTurnosPorPeriodo=false;

    this.mostrarLogs = true;

  }
  listarCantidadTurnosPorEspecialidad(){
    this.mostrarLogs = false;
    this. mostrarTurnosPorDia=false;
    this.mostrarTurnosPorPeriodo=false;

    this.mostrarGraficoEspecialidad = true;
  }
  listarTurnosPorDia(){
    this.mostrarLogs = false;
    this.mostrarGraficoEspecialidad = false;
    this.mostrarTurnosPorPeriodo=false;

    this.mostrarTurnosPorDia=true;
  }
  listarTurnosPorPeriodo(){
    this.mostrarLogs = false;
    this.mostrarGraficoEspecialidad = false;
    this.mostrarTurnosPorDia=false;
    this.mostrarTurnosPorPeriodo=true;
  }

  
    



}

