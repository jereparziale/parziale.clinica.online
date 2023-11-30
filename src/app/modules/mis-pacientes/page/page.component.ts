import { Component, inject } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {


  public pacientes: Paciente[] = [];
  public pacientesSinDuplicados: string[] = [];
  public pacienteSeleccionado:any;
  public mostrarHistoriaPaciente:boolean=false;
  public turnos:Turno[]=[]


  constructor(
    private usuarioService: UsuarioService,
    private userAuthService: UserAuthService,
    private turnosService: TurnosService
  ) {}

  ngOnInit() {
    this.obtenerPacientes();
  }

  private obtenerPacientes() {
    this.userAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        this.turnosService.traerPorEspecialista(user.email).subscribe(
          (turnos: Turno[]) => {
            this.turnos=turnos;
            console.log(turnos)
            const emailsPacientes = turnos.map(turno => turno.pacienteEmail);
            this.obtenerPacientesPorEmails(emailsPacientes);
          }
        );
      }
    });
  }

  private obtenerPacientesPorEmails(emailsPacientes: string[]) {
    const pacientes: Paciente[] = [];

    const obtenerPacienteCallback = (email: string) => {
      this.usuarioService.traerUno(email).subscribe(
        (paciente) => {
          pacientes.push(paciente[0]);
          if (pacientes.length === emailsPacientes.length) {
            // Todos los pacientes han sido obtenidos
            console.log(pacientes);
            this.pacientes = [...pacientes]; // Copiar el array para evitar la referencia directa
            this.pacientes = this.pacientes.filter((paciente, index, array) => {
              return array.findIndex(item => item.mail === paciente.mail) === index;
            });
          }
        }
      );
    };

    emailsPacientes.forEach(obtenerPacienteCallback);
  }


  seleccionarPaciente(elemento:any){
    this.pacienteSeleccionado=elemento;
    console.log(this.pacienteSeleccionado);
    this.mostrarHistoriaPaciente=true;
  }
}
