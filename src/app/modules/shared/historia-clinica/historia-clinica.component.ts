import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import { Turno } from 'src/app/models/turno';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  constructor(private turnosService:TurnosService,
    private EspecialidadesService:EspecialidadService) { }
  @Input() paciente?:Paciente;
  @Input() rolUsuario?:string='';
  @ViewChild('historiaClinica', { static: false }) historiaClinica: ElementRef | undefined;


  turnos:Turno[]=[]
  especialidades:any[]=[]
  hayTurnos:boolean=false;
  especialidadSeleccionada:string='';


 
  ngOnInit(): void {
    this.EspecialidadesService.todos().subscribe((res)=>{
      this.especialidades=res;
    })

    this.actualizarTurnos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente'] && !changes['paciente'].firstChange) {
      // Solo se ejecuta si hay un cambio en el input paciente y no es el primer cambio
      this.actualizarTurnos();
    }
  }

  private actualizarTurnos() {
    if (this.paciente) {
      this.turnosService.traerPorPaciente(this.paciente.mail)
        .subscribe((res) => {
          this.turnos = res;
          console.log(this.turnos);
        });



    }
  }

  seleccionarEspecialidad(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.especialidadSeleccionada = select.value;
    this.generarPDF()
  }

  generarPDF() {
    const pdf = new jsPDF();
    let startY = 30;

  
    if (this.paciente) {
      pdf.addImage('../../../assets/logo_PDF.png', 'PNG', 10, 10, 10, 10);
      pdf.text('Historia Clínica', 80, 25);
      pdf.text('Fecha de emisión: ' + new Date().toLocaleDateString(), 15, 30);
      pdf.text('Nombre y Apellido: ' + this.paciente.nombre + ' ' + this.paciente.apellido, 15, 40);
      startY = 70;
      this.turnos.forEach(element => {

        if(element.especialidad===this.especialidadSeleccionada){
          this.hayTurnos=true;
          if (startY + 20 > pdf.internal.pageSize.height) {
            pdf.addPage();
            startY = 30;
          }
    
          pdf.text('Fecha del turno: ' + element.dia + ' ' + element.horario, 15, startY);
          pdf.text('Estado: ' + element.estado, 15, startY + 10);
          pdf.text('Especialidad: ' + element.especialidad, 15, startY + 20);
    
          if (element.atencion?.altura) {
            pdf.text('Presion: ' + element.atencion.presionSistole + '/' + element.atencion.presionDiastole, 15, startY + 30);
            pdf.text('Temperatura (C°): ' + element.atencion.temperatura, 15, startY + 40);
            pdf.text('Altura (m): ' + element.atencion.altura, 15, startY + 50);
            pdf.text('Peso (Kg): ' + element.atencion.peso, 15, startY + 60);
          }
          startY += 30
          startY += 70;
        }

       
      });
      if(this.hayTurnos){
        pdf.save(`${this.paciente.apellido}_historia_clinica.pdf`);
      }
    }
  }


}
 