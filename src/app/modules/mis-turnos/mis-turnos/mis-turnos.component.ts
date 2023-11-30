import { Component, Input, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import swal from 'sweetalert2';

interface Atencion {
  altura: number;
  peso: number;
  temperatura: number;
  presionSistole: number;
  presionDiastole: number;
  datosDinamicos: Array<any>;
}

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  private TurnosService: TurnosService = inject(TurnosService);
  private UserAuthService: UserAuthService = inject(UserAuthService);

  @Input() rolUsuario?: string;
  @Input() turnosArray?: Turno[];
  public observable:Subscription | undefined
  public mostrarCargaAtencion:boolean=false;


  turnoSeleccionado: Turno | undefined;
  usuarioEmail: string = '';
  comentario: string = '';
  atencion: any;
  encuesta: string = '';
  nuevoEstado: string = '';

  ngOnInit(): void {
    this.UserAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        this.usuarioEmail = user.email;
        }
        
    });
  }

  rechazarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.nuevoEstado = 'rechazado';
  }
  cancelarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;

    this.nuevoEstado = 'cancelado';
  }
  aceptarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.nuevoEstado = 'aceptado';
    this.guardarCambios()
  }
  finalizarTurno(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.nuevoEstado = 'realizado';
    this.mostrarCargaAtencion=true;
  }
  ocultarCargaAtencion($atencion:Atencion) {
    this.mostrarCargaAtencion=false;
    this.atencion=$atencion;
    console.log(this.atencion);
    this.guardarCambioAtencion();
  }


  verComentario(turno: Turno) {
    this.turnoSeleccionado = turno;
  }
  calificarAtencion(turno: Turno) {
    this.turnoSeleccionado = turno;
  }
  guardarCambios() {
    if (this.turnoSeleccionado) {
      this.TurnosService.modificarEstadoTurno(
        this.turnoSeleccionado?.idTurno,
        this.nuevoEstado,
        this.comentario
      )
        .then(() => {
          swal.fire({
            icon: 'success',
            text: `Turno ${this.nuevoEstado}`,
          });
        })
        .catch(() => {
          swal.fire({
            icon: 'error',
            title: 'Error al modificar el turno',
          });
        });
    }
  }
  guardarCambioAtencion() {
    if (this.turnoSeleccionado) {
      this.TurnosService.modificarCalificarAtencion(
        this.turnoSeleccionado?.idTurno,
        this.nuevoEstado,
        this.atencion
      )
        .then(() => {
          swal.fire({
            icon: 'success',
            text: `Datos de atencion guardados con exito`,
          });
        })
        .catch(() => {
          swal.fire({
            icon: 'error',
            title: 'Error al modificar el turno',
          });
        });
    }
  }
  guardarCambioEncuesta() {
    if (this.turnoSeleccionado) {
      this.TurnosService.modificarCalificarEncuesta(
        this.turnoSeleccionado?.idTurno,
        this.encuesta
      )
        .then(() => {
          swal.fire({
            icon: 'success',
            text: `Calificacion guardada con exito`,
          });
        })
        .catch(() => {
          swal.fire({
            icon: 'error',
            title: 'Error al modificar el turno',
          });
        });
    }
  }

  getEstadoClass(turnoEstado: string): string {
    switch (turnoEstado) {
      case 'aceptado':
        return 'estado-aceptado';
      case 'realizado':
        return 'estado-realizado';
      case 'rechazado':
        return 'estado-rechazado';
      case 'cancelado':
        return 'estado-cancelado';
      default:
        return 'estado-pendiente';
    }
  }

  ngOnDestroy() {
    if(this.observable)
    {
      this.observable.unsubscribe();
    }
  }
}
