import { Component } from '@angular/core';
import { LogsService } from 'src/app/services/firestore/logs/logs.service';
import {trigger, state,transition,style,animate} from '@angular/animations'

interface Log {
  usuario: string;
  fecha_Ingreso: string;
}

@Component({
  selector: 'app-listado-logs',
  templateUrl: './listado-logs.component.html',
  styleUrls: ['./listado-logs.component.scss'],
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
export class ListadoLogsComponent {
  public propiedadesLog: string[]= ['usuario','fecha_ingreso'];
  public logs: Log[]= [];
  state:string = 'inactive';

  constructor(private LogsService:LogsService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.state='active'
    }, 500);

    this.LogsService.todos()
    .subscribe((data) => {
      this.logs=data;
      // console.log(data);
    });

  }


}
 