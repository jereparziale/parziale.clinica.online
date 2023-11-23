import { Component, Input, inject } from '@angular/core';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
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


@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.scss'],
})
export class GrillaTurnosComponent {
  constructor(private AuthService:UserAuthService,
              private TurnosService:TurnosService,
              private router: Router
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

    // Genera el array de fechas para los próximos 15 días
    this.fechasProximos15Dias = this.generarFechasProximos15Dias();
    this.generarTurnosDisponibles();
  }

  generarTurnosDisponibles() {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 15);
    if (this.especialista) {
      const disponibilidadEspecialidad =
        this.especialista.disponibilidadPorEspecialidad.filter(
          (d) => d.especialidad === this.especialidad
        );
      // console.log(disponibilidadEspecialidad)

      for (
        let fecha = new Date(fechaActual);
        fecha <= fechaLimite;
        fecha.setDate(fecha.getDate() + 1)
      ) {
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
    if (this.especialista && this.especialidad) {
      const nuevoTurno = new Turno(
        '',
        fechaTurno.fecha,
        fechaTurno.horario,
        this.AuthService.usuarioEmail,
        this.especialista?.mail,
        this.especialidad,
        'pendienteAceptacion',
        '',
        '',
        '',
        ''
      );
      this.turnoSeleccionado=nuevoTurno;
      console.log(nuevoTurno);
    }
  }

  confirmarTurno(){
    if(this.turnoSeleccionado){
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

  fechasProximos15Dias: string[] = [];

  cambiarFechaSiguiente() {
    // Genera un array de fechas para los próximos 15 días
    this.fechasProximos15Dias = this.generarFechasProximos15Dias();

    // Encuentra la posición actual de la fecha seleccionada en el array
    const index = this.fechasProximos15Dias.indexOf(this.fechaSeleccionada);

    // Si la fecha actual no está en el array o es la última fecha, selecciona la primera fecha en el array
    if (index === -1 || index === this.fechasProximos15Dias.length - 1) {
      this.fechaSeleccionada = this.fechasProximos15Dias[0];
    } else {
      // Si no, selecciona la siguiente fecha en el array
      this.fechaSeleccionada = this.fechasProximos15Dias[index + 1];
    }
  }

  generarFechasProximos15Dias(): string[] {
    const fechas: string[] = [];
    const fechaActual = new Date();

    for (let i = 0; i < 15; i++) {
      const fecha = new Date(fechaActual);
      fecha.setDate(fechaActual.getDate() + i);
      fechas.push(
        fecha.toLocaleDateString('es-AR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      );
    }

    return fechas;
  }
}
