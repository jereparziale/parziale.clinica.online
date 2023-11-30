import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';

@Component({
  selector: 'app-mis-turnos-page',
  templateUrl: './mis-turnos-page.component.html',
  styleUrls: ['./mis-turnos-page.component.scss'],
})
export class MisTurnosPageComponent implements OnInit {
  private UsuarioService: UsuarioService = inject(UsuarioService);
  private UserAuthService: UserAuthService = inject(UserAuthService);
  private TurnosService: TurnosService = inject(TurnosService);
  private userSubscription: Subscription | null = null;

  public campoBusqueda: string = 'dia';
  public claveDatoDinamico: string = '';
  public valorBusqueda: any = '';

  public usuarioEmail: string = '';
  public campoEmail: string = '';
  public rolSesion: string = '';

  turnos: Turno[] = [];

  ngOnInit(): void {
    this.userSubscription =
      this.UserAuthService.estadoLogObservable().subscribe((user) => {
        if (user) {
          this.UsuarioService.traerUno(user.email).subscribe((res) => {
            this.rolSesion = res[0].tipoUsuario;
            this.usuarioEmail = res[0].mail;
            if(this.rolSesion==='paciente')
              {this.campoEmail='pacienteEmail'}else{this.campoEmail='especialistaEmail'}
          });
        } else {
          this.rolSesion = '';
        }
      });
  }
  seleccionarCampo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.campoBusqueda = selectElement.value;
  }

  buscarTurnos() {
    console.log(this.campoBusqueda);
    console.log(this.valorBusqueda);
    console.log(this.claveDatoDinamico);
    this.turnos=[]


    if (this.campoBusqueda != 'datosDinamicos') {
      this.TurnosService.traerPorDosCampos(
        this.campoEmail,
        this.usuarioEmail,
        this.campoBusqueda,
        this.valorBusqueda
      ).subscribe((res) => {
        console.log(res);
        this.turnos = res;
      });
    } else {
      this.TurnosService.traerPorUnCampo(
        this.campoEmail,
        this.usuarioEmail,
      ).subscribe((res) => {
        const turnosAFiltrar: Turno[] = res;
        turnosAFiltrar.forEach((turno) => {
          turno.atencion?.datosDinamicos.forEach((datoDinamico) => {
            if (
              datoDinamico.clave == this.claveDatoDinamico &&
              datoDinamico.valor == this.valorBusqueda
            )
              this.turnos.push(turno);
          });
        });
        console.log(this.turnos);

      });
    }
  }

}
