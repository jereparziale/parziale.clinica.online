import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit{
  constructor(private UsuarioService:UsuarioService) { }
  public usuarios: any[]= [];
  public usuarioSeleccionado:any;
  public pacienteSeleccionado:Paciente | undefined;
  public propiedadesComunes: string[]= ['nombre','apellido','edad','dni','tipoUsuario','mail'];
  public propiedadesPaciente: string[] = [...this.propiedadesComunes, 'obraSocial'];
  public propiedadesEspecialista: string[] = [...this.propiedadesComunes, 'accesoConcedido','especialidades','disponibilidadPorEspecialidad'];
  @Output() retornarPaciente = new EventEmitter<Paciente>();

  @Input()
  tipoUsuarioFiltrado!: string;

  



  ngOnInit(): void {
    this.UsuarioService.todos(this.tipoUsuarioFiltrado)
    .subscribe((data) => {
      this.usuarios=data;
      // console.log(data);
    });

  }

  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
  }

  

  seleccionarEspecialista(usuario:any){
    this.usuarioSeleccionado=usuario;
  }
  seleccionarPaciente(usuario:any){
    this.pacienteSeleccionado=usuario;
    this.retornarPaciente.emit(this.pacienteSeleccionado);

  }
  darAcceso(){
    if(this.usuarioSeleccionado.accesoConcedido==false){
      this.UsuarioService.darAcceso(this.usuarioSeleccionado.mail)
      .then(() => {
          swal.fire({
            icon: 'success',
            text: `Acceso permitido a ${this.usuarioSeleccionado.mail}`
      })
    })
      .catch(()=>{
        swal.fire({
          icon: 'error',
          title: 'Error al conceder acceso'
        })
      })
    }else{
      swal.fire({
        icon: 'info',
        title: 'El usuario ya posse permisos'
      })
    }
  
  }

  

}
