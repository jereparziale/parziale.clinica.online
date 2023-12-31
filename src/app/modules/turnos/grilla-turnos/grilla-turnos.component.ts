import { Component, Input, inject } from '@angular/core';
import { Especialista } from 'src/app/models/usuarios/especialista';
import {FechaSprint2Pipe} from 'src/app/pipes/fecha-sprint2.pipe'
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Turno } from 'src/app/models/turno';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
interface TurnoHorario {
  fecha: string;
  horario: string;
}
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';


@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.scss'],
})
export class GrillaTurnosComponent {
  constructor(private AuthService:UserAuthService,
              private TurnosService:TurnosService,
              private router: Router,
              private UsuarioService: UsuarioService
              ) { }

  @Input() especialista?: Especialista;
  @Input() especialidad?: string;

  especialidadSeleccionada: string = '';
  turnosDisponibles: TurnoHorario[] = [];
  fechaSeleccionada: string = '';
  turnoSeleccionado:Turno | undefined;

  ngOnInit() {
    
    // Inicializa fechaSeleccionada con el día siguiente al actual
    const fechaHoy = new Date();
    const fechaManana = new Date(fechaHoy);
    fechaManana.setDate(fechaHoy.getDate() + 1);
    this.fechaSeleccionada = fechaManana.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // this.fechasProximos15Dias = this.generarFechasProximos15Dias();
    this.generarTurnosDisponibles();
  }

  generarTurnosDisponibles() {
    
    const fechaActual = new Date();
    const fechaManana = new Date();
    fechaManana.setDate(fechaActual.getDate() + 1);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 15);
    if (this.especialista) {
      const disponibilidadEspecialidad =
        this.especialista.disponibilidadPorEspecialidad.filter(
          (d) => d.especialidad === this.especialidad
        );
      // console.log(disponibilidadEspecialidad)

      for (
        let fecha = new Date(fechaManana);
        fecha <= fechaLimite;
        fecha.setDate(fecha.getDate() + 1)
      ) {
        console.log(fecha)
        const diaSemana = format(fecha, 'EEEE', { locale: es }).toLowerCase();

        // console.log('Fecha:', fecha.toLocaleDateString());
        // console.log('Dia de la semana:', diaSemana);

        const disponibilidadDia = disponibilidadEspecialidad.find((d) =>
          d.diasAtencion.toLowerCase().includes(diaSemana.substring(0, 3))
        );

        if (disponibilidadDia) {
          const desde = disponibilidadDia.desdeJornada;
          const hasta = disponibilidadDia.hastaJornada;
          const duracionTurno = disponibilidadDia.duracionTurno;

          for (let hora = desde; hora < hasta; hora++) {
            for (let minuto = 0; minuto < 60; minuto += duracionTurno) {
              const turno: TurnoHorario = {
                fecha: fecha.toLocaleDateString('es-AR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }),
                horario: `${hora}:${minuto.toString().padStart(2, '0')}`,
              };
              this.turnosDisponibles.push(turno);
            }
          }
        }
      }
    }

    console.log(this.turnosDisponibles);
  }

  enviarTurno(fechaTurno: TurnoHorario) {

    this.UsuarioService.traerUno(this.AuthService.usuarioEmail)
    .subscribe((res)=>{
      if(res[0]){
        if (this.especialista && this.especialidad) {
          const nuevoTurno = new Turno(
            '',
            fechaTurno.fecha,
            fechaTurno.horario,
            res[0].nombre+' '+res[0].apellido,
            this.AuthService.usuarioEmail,
            this.especialista?.nombre+' '+this.especialista.apellido,
            this.especialista?.mail,
            this.especialidad,
            'pendienteAceptacion',
            '',
            '',
            '',
            undefined
          );
    
          this.turnoSeleccionado=nuevoTurno;
          console.log(this.turnoSeleccionado.toJson());
        }
      }
    })

   
  }

  confirmarTurno(){
    if(this.turnoSeleccionado){
      this.turnoSeleccionado.atencion= {
        altura: "",        peso: "",
        temperatura: "",
        presionSistole: "",
        presionDiastole: "",
        datosDinamicos: [],
      };
      this.TurnosService.guardar(this.turnoSeleccionado.toJson())
      .then(()=>{
        swal.fire({
          icon: 'success',
          title: 'Turno Reservado con exito.'
        })
        this.router.navigateByUrl('/');
      })
      .catch(()=>{
        swal.fire({
          icon: 'error',
          title: 'Error al reservar el turno.'
        })
      })
    }
  }

  // fechasProximos15Dias: string[] = [];
  // generarFechasProximos15Dias(): string[] {
  //   const fechas: string[] = [];
  //   const fechaActual = new Date();
  
  //   // Obtenemos la fecha de mañana
  //   const fechaMañana = new Date(fechaActual.getTime() + (24 * 60 * 60 * 1000));
  //   console.log(fechaMañana)
  
  //   for (let i = 1; i <= 15; i++) {
  //     fechaMañana.setDate(fechaMañana.getDate() + i);
  //     fechas.push(
  //       fechaMañana.toLocaleDateString('es-AR', {
  //         year: 'numeric',
  //         month: '2-digit',
  //         day: '2-digit',
  //       })
  //     );
  //   }
  
  //   return fechas;
  // }
  
}
