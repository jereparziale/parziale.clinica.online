import { Component, ViewChild } from '@angular/core';
import { ListadoUsuariosComponent } from '../listado-usuarios/listado-usuarios.component';
import { Paciente } from 'src/app/models/usuarios/paciente';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent {

  public mostrarPacientes:boolean=false;
  public mostrarEspecialistas:boolean=true;
  public registrarAdmin:boolean=false;
  public mostrarHistoriaClinica:boolean=false;
  public tipoUsuarioFiltrado:string='especialista';
  public pacienteSeleccionado!: Paciente;
  @ViewChild(ListadoUsuariosComponent) listadoUsuariosComponent!: ListadoUsuariosComponent;


  listarPacientes(){
    this.mostrarEspecialistas = false;
    this.mostrarPacientes = true;
    this.registrarAdmin = false;

    this.tipoUsuarioFiltrado = 'paciente';
  }
  listarEspecialistas(){
    this.mostrarPacientes = false;
    this.mostrarEspecialistas = true;
    this.registrarAdmin = false;

    this.tipoUsuarioFiltrado = 'especialista';

  }
  registrarAdministrador(){
    this.mostrarPacientes = false;
    this.mostrarEspecialistas = false;
    this.registrarAdmin = true;
  }
  verHistoriaClinica(paciente:Paciente){
    this.registrarAdmin = false;
    this.pacienteSeleccionado=paciente;
    console.log(this.pacienteSeleccionado);
    this.mostrarHistoriaClinica=true;
  }

  exportarExcelDesdeUsuariosPage() {
    // Llama al método exportarExcel del componente hijo
    this.listadoUsuariosComponent.exportarExcel();
  }

}
 