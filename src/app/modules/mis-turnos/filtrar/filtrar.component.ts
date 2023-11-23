import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
})
export class FiltrarComponent {
  @Input() tipoFiltrado?: string;
  @Input() rolUsuario?: string;
  public filtrarPor: string = '';
  public titulo: string = '';
  private UsuarioService: UsuarioService = inject(UsuarioService);
  private especialidadService: EspecialidadService = inject(EspecialidadService);
  private UserAuthService: UserAuthService = inject(UserAuthService);

  public usuarios: Especialista[] = [];
  public especialidades: any[] = [];
  public especialidadesDelProfesional: any[] = [];
  busqueda: string = ''; // Variable para almacenar el string de búsqueda
  resultadosBusqueda: any[] = [];
  noHayResultados: boolean = false;

  public objetoSeleccionado: Especialista | Paciente | undefined;
  public especialidadSeleccionada: string = ' ';
  public mostrarMisTurnos: boolean = false;

  ngOnInit(): void {
    switch (this.rolUsuario) {
      case 'paciente':
        switch (this.tipoFiltrado) {
          case 'especialidad':
            this.filtrarPor = 'especialidad';
            this.titulo = 'de la especialidad';
            this.especialidadService.todos()
            .subscribe((data) => {
              this.especialidades=data;
            });
            break;
          case 'profesional':
            this.filtrarPor = 'profesional';
            this.titulo = 'del profesional';
            this.UsuarioService.todos('especialista').subscribe((data) => {
              this.usuarios = data;
            });
            break;
          default:
            break;
        }
        break;

      case 'especialista':
        switch (this.tipoFiltrado) {
          case 'especialidad':
            this.filtrarPor = 'especialidad';
            this.titulo = 'de la especialidad';
            this.UserAuthService.estadoLogObservable().subscribe((user) => {
              if (user) {
                console.log(user);
                this.UsuarioService.traerUno(user.email).subscribe((res) => {
                  this.especialidadesDelProfesional = res[0].especialidades;
                  console.log(this.especialidadesDelProfesional);
                });
              } else {
                this.especialidadesDelProfesional = [];
              }
            });
            break;
          case 'paciente':
            this.filtrarPor = 'paciente';
            this.titulo = 'del paciente';
            this.UsuarioService.todos('paciente').subscribe((data) => {
              this.usuarios = data;
            });
            break;
          default:
            break;
        }
        break;
    }
  }

  filtrarPorTermino(terminoBusqueda: string): any {
    // Filtrar por nombre de usuario
    this.resultadosBusqueda = this.usuarios.filter((usuario) => {
      const nombreCompleto = `${usuario.apellido} ${usuario.nombre}`;
      return nombreCompleto
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase());
    });
    return [];
  }

  buscar() {
    this.filtrarPorTermino(this.busqueda);
    if (this.resultadosBusqueda.length > 0) {
      this.noHayResultados = false;
    } else {
      this.noHayResultados = true;
    }
  }

  seleccionarProfesional(profesional: Especialista) {
    this.objetoSeleccionado = profesional;
    this.especialidadesDelProfesional =
      this.objetoSeleccionado.especialidades;
      this.mostrarMisTurnos = true;

  }
  selecionarEspecialidad(especialidad: string) {
    this.especialidadSeleccionada = especialidad;
    this.mostrarMisTurnos = true;
  }
  seleccionarPaciente(paciente: Paciente) {
    this.objetoSeleccionado = paciente;
    this.mostrarMisTurnos = true;
  }
}
