import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { TurnosService } from 'src/app/services/firestore/turnos/turnos.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  constructor(private turnosService:TurnosService) { }
  @Input() paciente?:Paciente;
  @Input() rolUsuario?:string='';
  @ViewChild('historiaClinica', { static: false }) historiaClinica: ElementRef | undefined;


  turnos:any[]=[]

  ngOnInit(): void {
    if(this.paciente){
      this.turnosService.traerPorPaciente(this.paciente.mail)
      .subscribe((res)=>{
        this.turnos=res;
      })

    }
  }

  guardarPdf(){

  }

  generarPDF() {
    console.log(this.historiaClinica);
    if (this.historiaClinica) {
      const pdf = new jsPDF();

      // Obtener el contenido del elemento con id 'historiaClinica'
      html2canvas(this.historiaClinica.nativeElement).then((canvas) => {
        const imgData = canvas.toDataURL('../../../../assets/logo_PDF.png');
        console.log(imgData)
        // Agregar la imagen capturada al PDF
        pdf.addImage(imgData, 'PNG', 15, 40, 180, 160);

        // Otros elementos del PDF
        pdf.text('Clinica Online', 80, 25);
        pdf.text('Fecha de emisión: ' + new Date().toLocaleDateString(), 15, 220);

        // Guardar o visualizar el PDF
        pdf.save(`${this.paciente?.apellido}_historia_clinica.pdf`);
        // window.open(pdf.output('bloburl'), '_blank');
      });
    }
  }


}
 