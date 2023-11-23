import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private UserAuthService: UserAuthService,
    private UsuarioService: UsuarioService,
    private router: Router
  ) {}

  public usuarioEmail:string='';
  public usuarioLogueado:boolean=false;
  public rolUsuario:string='';


  ngOnInit(): void {
    this.UserAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        this.UsuarioService.traerUno(user.email)
        .subscribe((res)=>{
          if(res[0]){
            this.usuarioEmail=res[0].mail;
            this.rolUsuario=res[0].tipoUsuario
            this.usuarioLogueado=true;
          }
        })
      } else {
        // Usuario no autenticado
        this.usuarioLogueado=false;
      }
    });
  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  register() {
    this.router.navigateByUrl('auth/register');
  }
  usuariosAdmin() {
    this.router.navigateByUrl('usuarios');
  }
  turnos() {
    this.router.navigateByUrl('turnos');
  }
  turnosAdmin() {
    this.router.navigateByUrl('turnos_admin');
  }
  misTurnos() {
    this.router.navigateByUrl('mis_turnos');
  }
  miPerfil() {
    this.router.navigateByUrl('mi_perfil');
  }
  misPacientes() {
    this.router.navigateByUrl('mis_pacientes');
  }

  cerrarSesion() {
    this.UserAuthService.logout()
      .then(() => {
        this.router.navigateByUrl('auth/login');
      })
      .catch((error) => console.error(error));
  }
}
