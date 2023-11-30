import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { Turno } from 'src/app/models/turno';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service'
import {trigger, state,transition,style,animate} from '@angular/animations'
@Component({
  selector: 'app-grafico-especialidad',
  templateUrl: './grafico-especialidad.component.html',
  styleUrls: ['./grafico-especialidad.component.scss'],
  //metadatos
  animations: [
    trigger('animaciones', [
      state('active', style({
        transform: 'translateX(0)', // Inicialmente, sin desplazamiento en el eje X
      })),
      state('inactive', style({
        transform: 'translateX(-100%)', // Desplazamiento completo hacia la izquierda
      })),
      transition('inactive => active', animate('300ms ease-in')),
    ]),
  ],
})
export class GraficoEspecialidadComponent {
  constructor(private EspecialidadService:EspecialidadService,
    private TurnosService:TurnosService) {}
    state:string = 'inactive';

  
  public mostrarLogs:boolean=false;
  public mostrarGraficoEspecialidad:boolean=false;
  public chart!: Chart;
  public especialidades:any[]=[]
  public turnos:Turno[]=[] 

  ngOnInit(){

    setTimeout(() => {
      this.state='active'
    }, 500);

    this.EspecialidadService.todos().subscribe((res)=>{
      this.especialidades = res;
      this.TurnosService.todos().subscribe((res)=>{
        this.turnos = res;
        this.cargarTurnosPorEspecialidad()
      })
    })
  }

  private cargarTurnosPorEspecialidad() {
    const labels:string[] = [];
    const cantidades: number[] = [];
    this.especialidades.forEach(especialidad => {
      labels.push(especialidad.especialidad);
      let cantidadTurnos = 0;
      this.turnos.forEach(turno => {
        if (turno.especialidad === especialidad.especialidad)
          cantidadTurnos++;
      });
      cantidades.push(cantidadTurnos);
    });
    const data = {
      labels: labels,
      datasets: [{
        label: 'Especialidad',
        data: cantidades,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2

        // tension: 0.1
      }]
    };

    this.chart = new Chart("chart", {
      type: 'bar',
      data
    });
  }
}
