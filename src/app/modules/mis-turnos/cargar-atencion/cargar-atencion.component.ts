import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

interface Atencion {
  altura: number;
  peso: number;
  temperatura: number;
  presionSistole: number;
  presionDiastole: number;
  datosDinamicos: Array<any>;
}

@Component({
  selector: 'app-cargar-atencion',
  templateUrl: './cargar-atencion.component.html',
  styleUrls: ['./cargar-atencion.component.scss']
})
export class CargarAtencionComponent implements OnInit {
  historialForm!: FormGroup;
  datosAgregados:number=0;
  atencion:Atencion | undefined;
  @Input() idTurnoInput?: string;
  @Output() volverMisTurnos = new EventEmitter<Atencion>();



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log('inice');
    this.historialForm = this.fb.group({
      altura: [10, [Validators.required,Validators.max(250), Validators.min(10)]],
      peso: [1, [Validators.required,Validators.max(500), Validators.min(1)]],
      temperatura: [30, [Validators.required,Validators.max(43), Validators.min(30)]],
      presionSistole: [100, [Validators.required,Validators.max(250), Validators.min(50)]],
      presionDiastole: [100, [Validators.required,Validators.max(250), Validators.min(50)]],
      datosDinamicos: this.fb.array([]),
    });
  }

  get datosDinamicos(): FormArray | undefined{
    if(this.historialForm){
      return this.historialForm.get('datosDinamicos') as FormArray;
    }
    return undefined
  }

  agregarDatoDinamico() {
    if (this.datosDinamicos) {
      this.datosAgregados++;
      this.datosDinamicos.push(this.fb.group({
        clave: ['', [Validators.required, Validators.minLength(4)]],
        valor: ['', [Validators.required, Validators.minLength(1)]],
      }));
    }
  }

  guardarHistorial() {
    if(this.historialForm){
      if(this.historialForm.valid){
            this.atencion=this.historialForm.value;
            this.volverMisTurnos.emit(this.atencion);
      }
   

    }
    
  }
  
}

