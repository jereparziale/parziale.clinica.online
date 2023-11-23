import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss']
})
export class FiltrarComponent implements OnInit{
  @Input() tipoFiltrado?: string;
  public filtrarPor:string ='';
  public titulo:string ='';
  public placeholder:string ='';
  private usuarioService: UsuarioService = inject(UsuarioService);
  private especialidadService: EspecialidadService = inject(EspecialidadService);

  public usuarios:Especialista[]=[]
  public especialidades:any[]=[]
  public especialidadesDelProfesional:any[]=[]
  public profesionalesPorEspecialidad:any[]=[]
  busqueda: string = ''; // Variable para almacenar el string de búsqueda
  resultadosBusqueda:any[]=[]
  noHayResultados:boolean=false;


  public profesionalSeleccionado:Especialista | undefined;
  public especialidadSeleccionada:string='';
  public mostrarGrillaTurnos:boolean=false;




   
  
  ngOnInit(): void {
    if(this.tipoFiltrado =='especialidad'){
      this.filtrarPor='especialidad';
      this.titulo='de la especialidadad';
      this.especialidadService.todos()
      .subscribe((data) => {
        this.especialidades=data;
      });
    }else{
      this.filtrarPor='profesional';
      this.titulo='del profesional';
      this.usuarioService.todos("especialista")
      .subscribe((data) => {
        this.usuarios=data;
      });
    }
  


  }
  

  
  filtrarEspecialistas(terminoBusqueda: string): any {
      // Filtrar por nombre de usuario
      this.resultadosBusqueda = this.usuarios.filter(usuario => {
        const nombreCompleto = `${usuario.apellido} ${usuario.nombre}`;
        return nombreCompleto.toLowerCase().includes(terminoBusqueda.toLowerCase());
      });
    return [];
  }
  

  buscar(){
    this.filtrarEspecialistas(this.busqueda)
    if(this.resultadosBusqueda.length>0){
      this.noHayResultados=false;
    }else{
      this.noHayResultados=true;
    }
    console.log(this.resultadosBusqueda);
  }

  seleccionarProfesional(profesional:Especialista) {
    this.profesionalSeleccionado=profesional;
    this.especialidadesDelProfesional=this.profesionalSeleccionado.especialidades;
  }
  selecionarEspecialidad(especialidad:string) {
    this.especialidadSeleccionada=especialidad;
    this.mostrarGrillaTurnos=true;
  }

  seleccionarProfesionalSegunEspecialidad(profesional:Especialista){
    this.profesionalSeleccionado=profesional;
    this.mostrarGrillaTurnos=true;
  }

  buscarProfesionalesPorEspecialidad(especialidadSeleccionada:string){
    this.especialidadSeleccionada=especialidadSeleccionada;
    console.log(especialidadSeleccionada);
    // const especialidad:string[]=[especialidadSeleccionada]
    this.usuarioService.traerEspecialistasPorEspecialidad(especialidadSeleccionada)
    .subscribe((res=>{
      console.log(res);
      this.profesionalesPorEspecialidad=res;
    }))
  }
  
  

}
