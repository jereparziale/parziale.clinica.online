import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import { ImagenesService } from 'src/app/services/storage/imagenes.service';
interface Imagen {
  emailEspecialista: string;
  nombreEspecialidad: string;
  urlImagen: string;
}
@Component({
  selector: 'app-turnos-page',
  templateUrl: './turnos-page.component.html',
  styleUrls: ['./turnos-page.component.scss'],
})
export class TurnosPageComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);
  private ImagenesService: ImagenesService = inject(ImagenesService);

  public usuarios: Especialista[] = [];
  public imagenes: Imagen[] = [];
  public especialidadesDelEspecialista: string[] = [];
  especialistaSeleccionado: Especialista | undefined;
  especialidadSeleccionada: string | undefined;

  public mostrarEspecialidades:boolean=false;
  public mostrarEspecialistas:boolean=true;
  public mostrarGrillaTurnos:boolean=false;

  ngOnInit(): void {
    this.usuarioService.todos('especialista').subscribe((data) => {
      this.usuarios = data;

      this.CargarImagenesEspecialistas();
    });
  }

  

  seleccionarEspecialista(especialista:Especialista){
    this.especialistaSeleccionado= especialista;
    this.especialidadesDelEspecialista = especialista.especialidades;
    this.CargarImagenesEspecialidades()

    console.log(this.especialidadesDelEspecialista)
    this.mostrarEspecialistas=false;
    this.mostrarEspecialidades=true;
  }
  seleccionarEspecialidad(especialidad:string){
    this.especialidadSeleccionada= especialidad;
    this.mostrarEspecialidades=false;
    this.mostrarGrillaTurnos=true;
  }

  private CargarImagenesEspecialistas() {
    this.usuarios.forEach((element) => {
      this.ImagenesService.getImagen(
        'imagesUsuarios',
        element.mail,
        '_1'
      ).then((res) => {
        let imagen: Imagen = {
          emailEspecialista: element.mail,
          urlImagen: res,
          nombreEspecialidad: ''
        };
        this.imagenes.push(imagen);
      });
    });
  }

  private CargarImagenesEspecialidades() {
    this.especialidadesDelEspecialista.forEach((element) => {
      this.ImagenesService.getImagen(
        'imagesEspecialidades',
        element,
        '.jpg'
      ).then((res) => {
        let imagen: Imagen = {
          emailEspecialista: '',
          urlImagen: res,
          nombreEspecialidad: element
        };
        this.imagenes.push(imagen);
      })
      .catch(()=>{
        let imagen: Imagen = {
          emailEspecialista: '',
          urlImagen: 'assets/especialidad.jpg',
          nombreEspecialidad: element
        };
        this.imagenes.push(imagen);
      })
      
    });
  }
}
