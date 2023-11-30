import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit{
  constructor(private UsuarioService:UsuarioService,
    private TurnosService: TurnosService) { }
    public turnos:any[]=[];
  public usuarios: any[]= [];
  public usuarioSeleccionado:any;
  public pacienteSeleccionado:Paciente | undefined;
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


  exportarExcel(){
    // Filtra los campos que deseas mostrar en el Excel
    const turnosFiltrados = this.usuarios.map((usuario: any) => {
      return {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        tipoUsuario: usuario.tipoUsuario,
        edad: usuario.edad,
        dni: usuario.dni,
        mail: usuario.mail,
      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(turnosFiltrados);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'usuarios.xlsx');
}


  

  seleccionarEspecialista(usuario:any){
    this.usuarioSeleccionado=usuario;
  }
  seleccionarPaciente(usuario:any){
    this.pacienteSeleccionado=usuario;
    if(this.pacienteSeleccionado){
      this.TurnosService.traerPorPaciente(this.pacienteSeleccionado?.mail)
      .subscribe((res) => {
        this.turnos=res;
      })
    this.retornarPaciente.emit(this.pacienteSeleccionado);

  }
}

// En tu componente
irAEtiqueta() {
  const etiqueta = document.getElementById('historia');
  if (etiqueta) {
    etiqueta.scrollIntoView({ behavior: 'smooth' });
  }
}


  descargarExcelTurnos(){
        // Filtra los campos que deseas mostrar en el Excel
        const turnosFiltrados = this.turnos.map((turno: any) => {
          return {
            dia: turno.dia,
            horario: turno.horario,
            especialistaEmail: turno.especialistaEmail,
            especialidad: turno.especialidad,
            estado: turno.estado,
          };
        });
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(turnosFiltrados);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'turnosPorUsuario');
        XLSX.writeFile(wb, 'turnosPorUsuario.xlsx');
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
