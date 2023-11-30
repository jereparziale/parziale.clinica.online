import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private UserAuthService: UserAuthService,
    private UsuarioService: UsuarioService,
    private router: Router
  ) {}


  public usuarioEmail:string='';
  public usuarioLogueado:boolean=false;
  public rolUsuario:string='';
  public usuario:any;
  Subscription:Subscription | undefined
  SubscriptionUsuario:Subscription | undefined


  ngOnInit(): void {
     this.Subscription=this.UserAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        console.log("pase");
        console.log(user);
        console.log(user.email);
        this.SubscriptionUsuario =this.UsuarioService.traerUno(user.email)
        .subscribe((res)=>{
          if(res[0]){
          
            this.usuario=res[0]
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
  cerrarSesion() {
    this.UserAuthService.logout()
      .then(() => {
        console.log("logout")
        if(this.Subscription && this.SubscriptionUsuario){
          this.Subscription.unsubscribe();
          this.SubscriptionUsuario.unsubscribe();
          console.log('me desuscribi')

        }

        this.usuarioEmail='';
        this.rolUsuario=''
        this.usuarioLogueado=false;
        this.usuario=undefined;
        console.log(this.usuario)
        this.router.navigateByUrl('auth/login');
      })
      .catch((error) => console.error(error));
  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  register() {
    this.router.navigateByUrl('auth/register');
  }
  usuariosAdmin() {
    console.log("hola")
    this.router.navigateByUrl('usuarios/usuarios');
  }
  turnos() {
    this.router.navigateByUrl('turnos');
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
  irEstadisticas() {
    this.router.navigateByUrl('estadisticas');
  }




  ngOnDestroy(): void {
    throw new Error('Destruido');
  }
}
