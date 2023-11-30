import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagenesService } from 'src/app/services/storage/imagenes.service';

@Component({
  selector: 'app-accesos-rapidos',
  templateUrl: './accesos-rapidos.component.html',
  styleUrls: ['./accesos-rapidos.component.scss']
})
export class AccesosRapidosComponent implements OnInit {

  @Input() usuarioEmail: string = '';
  @Input() contrasenia: string = '';
  urlImagen: string='';
  @Output() seleccionarUsuario = new EventEmitter<{ email: string; password: string }>();

  constructor(
    private ImagenesService: ImagenesService
  ) {}


  ngOnInit(): void {
    this.ImagenesService.getImagen('imagesUsuarios',this.usuarioEmail,'_1')
    .then((res)=>{
      this.urlImagen=res;
    })

  }

  onImagenClick(): void {
    this.seleccionarUsuario.emit({ email: this.usuarioEmail, password: this.contrasenia });
  }
}
