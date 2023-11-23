import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';

@Component({
  selector: 'app-mis-turnos-page',
  templateUrl: './mis-turnos-page.component.html',
  styleUrls: ['./mis-turnos-page.component.scss']
})
export class MisTurnosPageComponent  implements OnInit {
 
  private UsuarioService: UsuarioService = inject(UsuarioService);
  private UserAuthService: UserAuthService = inject(UserAuthService);
  private userSubscription: Subscription | null = null;


  public rolSesion:string='';
  public filtrarProfesional:boolean=false; 
  public filtrarEspecialidad:boolean=false;
  public filtrarPaciente:boolean=false;
  
  ngOnInit(): void {
    this.userSubscription = this.UserAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        this.UsuarioService.traerUno(user.email)
        .subscribe((res)=>{
          this.rolSesion=res[0].tipoUsuario;
        })
      } else {
        this.rolSesion = '';
      }
    });
  }


  irPaciente(){
    this.filtrarPaciente=true;
  }
  irProfesional(){
    this.filtrarProfesional=true;
  }
  irEspecialidad(){
    this.filtrarEspecialidad=true;
  }


}