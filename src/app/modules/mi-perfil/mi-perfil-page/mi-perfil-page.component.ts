import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service'
import { ImagenesService } from 'src/app/services/storage/imagenes.service';

@Component({
  selector: 'app-mi-perfil-page',
  templateUrl: './mi-perfil-page.component.html',
  styleUrls: ['./mi-perfil-page.component.scss']
})
export class MiPerfilPageComponent implements OnInit{
  constructor(
    private UserAuthService: UserAuthService,
    private UsuarioService: UsuarioService,
    private ImagenesService: ImagenesService,
  ) {}

  usuarioActual:Paciente | Especialista | Usuario |undefined;
  paciente:Paciente | undefined;
  especialista:Especialista | undefined;
  administrador:Usuario | undefined;
  urlImagen1:string='';

  mostrarHistoriaClinica:boolean=false;

  ngOnInit(): void {
    this.UserAuthService.estadoLogObservable().subscribe((user) => {
      if (user) {
        this.UsuarioService.traerUno(user.email).subscribe((res) => {
          if (res[0]) {
            this.usuarioActual = res[0];
            if(this.usuarioActual){
                if (this.usuarioActual.tipoUsuario === 'paciente') {
                  this.paciente = this.usuarioActual as Paciente;
                }else if(this.usuarioActual.tipoUsuario === 'especialista'){
                  this.especialista = this.usuarioActual as Especialista;
                }else{
                  this.administrador = this.usuarioActual as Usuario;
                }
                this.ImagenesService.getImagen('imagesUsuarios',this.usuarioActual.mail,'_1')
                .then((res)=>{
                  this.urlImagen1=res;
                })
            }
          }
        });
      } else {
        // Usuario no autenticado
      }
    });
  }

  cargarHistoriaPaciente(){
    this.mostrarHistoriaClinica=true;
  }
}
