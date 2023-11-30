import { Component, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { Subscription } from 'rxjs';
import { LogsService } from 'src/app/services/firestore/logs/logs.service';
interface log{
    usuario: string
    fecha_Ingreso: Date
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private firestore: Firestore = inject(Firestore);

  constructor(
    private UserAuthService: UserAuthService,
    private router: Router,
    private UsuarioService: UsuarioService,
    private LogsService: LogsService
  ) {}
  public emailAccesoRapido = '';
  public passwordAccesoRapido = '';
  public cargando: boolean = false;
  usuario = {
    email: '',
    password: '',
  };
  usuariosPaciente = [
    { email: 'mfggwrmjxlamfmvmvn@cwmxc.com', password: '12345678' },
    { email: 'daxojin269@bixolabs.com', password: '12345678' },
    { email: 'xskiehvdakadgmorea@cazlg.com', password: '12345678' },
    // Agrega los otros usuarios aquí
  ];
  usuariosAdmin = [
    { email: 'angpowhmmjtxnwjvls@cazlp.com', password: '12345678' },
    // Agrega los otros usuarios aquí
  ];
  usuariosEspecialista = [
    { email: 'wynvnzrvewuxpoxihk@cazlv.com', password: '12345678' },
    { email: 'yecet48204@eachart.com', password: '12345678' },
    // Agrega los otros usuarios aquí
  ];
  
  public observable:Subscription | undefined


  login() {
    this.cargando = true;
    this.observable= this.UsuarioService.traerUno(this.usuario.email).subscribe((res) => {
      if (res[0]) {
        //EN CASO DE SER PACIENTE SE ACCEDE A HOME
        if (res[0].tipoUsuario === 'paciente' || (res[0].tipoUsuario === 'admin' && res[0].accesoConcedido)) {
          this.autenticar();
        } else {
          //EN CASO DE SER ESPECIALISTA SE VERIFICA ACCESO DE ADMINISTRADOR
          if (res[0].tipoUsuario === 'especialista' && res[0].accesoConcedido) {
            this.autenticar();
          } else {
            swal.fire({
              icon: 'info',
              title: 'Acceso Denegado',
              text: 'Contactate con el administrador para recibir el acceso',
            });
            this.cargando = false;
          }
        }
      }else{
        this.cargando = false;
        swal.fire({
          icon: 'error',
          title: 'Usuario inexistente',
          text: 'Revisa el mail ingresado',
        });
      }
    });
  }

  autenticar() {
    this.UserAuthService.login(this.usuario)
      .then((res) => {
        if (res.user.emailVerified) {
          this.guardarLog()
          this.router.navigateByUrl('home');
        } else {
          swal.fire({
            icon: 'info',
            title: 'Registro Pendiente',
            text: 'Debes verificar tu direccion de correo para continuar',
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        this.cargando = false;
      });
  }

  guardarLog() {
    const fechaActual = new Date().toLocaleString();
    let log: { usuario: string; fecha_Ingreso: string } = { usuario: this.usuario.email, fecha_Ingreso: fechaActual };
    this.LogsService.guardar(log)
      .then(() => {
        // console.log("Guardado");
      });
  }

  registro() {
    // this.router.navigateByUrl("register");
  }
  ngOnDestroy() {
    if(this.observable)
    {
      this.observable.unsubscribe();
    }
  }

  cargarUsuarioSeleccionado(usuario: { email: string; password: string }): void {
    // Lógica para cargar el usuario seleccionado
    this.usuario.email = usuario.email;
    this.usuario.password = usuario.password;
  }
  
} 
