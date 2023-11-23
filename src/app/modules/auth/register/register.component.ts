import { Component, Input } from '@angular/core';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/usuarios/paciente';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { UsuarioService } from 'src/app/services/firestore/usuarios/usuario.service';
import { ObrasSocialesService } from 'src/app/services/firestore/obrasSociales/obras-sociales.service';
import { EspecialidadService } from 'src/app/services/firestore/especialidad/especialidad.service';
import { ImagenesService } from 'src/app/services/storage/imagenes.service';
import { Usuario } from 'src/app/models/usuario';
interface DisponibilidadPorEspecialidad {
  especialidad: string;
  diasAtencion: string;
  duracionTurno: number;
  desdeJornada: number;
  hastaJornada: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  formDisponibilidad!: FormGroup;
  @Input() usuarioAdmin?: boolean;
  especialidadesSeleccionadas: string[] = [];
  usuarioEmail: string = '';
  tipoUsuario: string = '';
  especialidades: any[] = [];
  obrasSociales: any[] = [];
  diasSemana: string[] = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
  ];

  imagenPerfil1: any;
  imagenPerfil2: any;

  constructor(
    private UserAuthService: UserAuthService,
    private UsuarioService: UsuarioService,
    private ObrasSocialesService: ObrasSocialesService,
    private EspecialidadService: EspecialidadService,
    private ImagenesService: ImagenesService,
    private router: Router
  ) {}
  public cargando: boolean = false;

  usuario = {
    email: '',
    password: '',
  };
  disponibilidadPorEspecialidadArray: DisponibilidadPorEspecialidad[] = [];

  ngOnInit(): void {
    if (this.usuarioAdmin) {
      this.tipoUsuario = 'admin';
    }
    console.log(this.tipoUsuario);

    //generacion de los forms
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.required,
      ]),
      apellido: new FormControl('', [
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.required,
      ]),
      edad: new FormControl(0, [
        Validators.max(120),
        Validators.min(0),
        Validators.required,
      ]),
      dni: new FormControl(0, [
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]+$'),
        Validators.required,
      ]),
      mail: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.minLength(8),
        Validators.required,
      ]),
      captcha: new FormControl(null, Validators.required),
    });

   
    if (this.tipoUsuario === 'admin') {
      this.form.addControl(
        'imagenPerfil1',
        new FormControl('', Validators.required)
      );
    }


    this.formDisponibilidad = new FormGroup({
      especialidad: new FormControl('', Validators.required),
      duracionTurno: new FormControl(30, [
        Validators.required,
        Validators.min(30),
        Validators.max(60),
      ]),
      desdeJornada: new FormControl(8, [
        Validators.required,
        Validators.min(8),
        Validators.max(17),
      ]),
      hastaJornada: new FormControl(18, [
        Validators.required,
        Validators.min(9),
        Validators.max(18),
      ]),
      lunes: new FormControl(''),
      martes: new FormControl(''),
      miercoles: new FormControl(''),
      jueves: new FormControl(''),
      viernes: new FormControl(''),
      sabado: new FormControl(''),
      //falta validador propio de dias seleccionados y que no se pisen entre si
    });

    console.log(this.form);
  }

  get especialidadesCargadas() {
    return this.form.get('especialidadesCargadas');
  }
  get obraSocial() {
    return this.form.get('obraSocial');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get edad() {
    return this.form.get('edad');
  }
  get mail() {
    return this.form.get('mail');
  }
  get dni() {
    return this.form.get('dni');
  }
  get password() {
    return this.form.get('password');
  }

  enviarForm() {
    this.cargando = true;
    console.log(this.form);
    let usuario: Especialista | Paciente | Usuario; // Definir la variable usuario genérica

    if (this.form.valid) {
      const formData = this.form.value;

      if (this.tipoUsuario === 'especialista') {
        usuario = new Especialista(
          formData.nombre,
          formData.apellido,
          formData.edad,
          formData.dni,
          formData.mail,
          this.tipoUsuario,
          this.especialidadesSeleccionadas,
          this.disponibilidadPorEspecialidadArray,
          false
        );
      } else if (this.tipoUsuario === 'paciente') {
        usuario = new Paciente(
          formData.nombre,
          formData.apellido,
          formData.edad,
          formData.dni,
          formData.mail,
          this.tipoUsuario,
          formData.obraSocial
        );
      }else if (this.tipoUsuario === 'admin') {
        usuario = new Usuario(
          formData.nombre,
          formData.apellido,
          formData.edad,
          formData.dni,
          formData.mail,
          this.tipoUsuario,
        );
      }

      this.usuario.email = formData.mail;
      this.usuario.password = formData.password;

      this.UserAuthService.registro(this.usuario)
        .then(() => {
          this.UsuarioService.guardar(usuario.toJSON())
            .then(() => {
              this.UserAuthService.logout();
              swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Por favor diríjase a su casilla de correo para verificar su correo',
              });

              this.subirImagenes(usuario);
              this.form.reset();
            })
            .catch((error) => {
              console.error('Error al intentar guardar:', error);
            });
        })
        .catch((error) => {
          console.log(error.message); // Muestra un mensaje de error al usuario
        })
        .finally(() => {
          this.cargando = false;
        });
    }
  }

  private subirImagenes(usuario: Especialista | Paciente | Usuario) {
    this.ImagenesService.uploadImage(
      this.imagenPerfil1,
      this.usuario.email,
      '1'
    ).then((res) => {
      console.log(res);
    });
    if (usuario.tipoUsuario === 'paciente') {
      this.ImagenesService.uploadImage(
        this.imagenPerfil2,
        this.usuario.email,
        '2'
      ).then((res) => {
        console.log(res);
      });
    }
  }

  enviarDisponibilidad() {
    if (this.formDisponibilidad.valid) {
      const formData = this.formDisponibilidad.value;
      // Crear la cadena diasAtencion a partir de los valores de los controles
      const diasAtencion = diasSeleccionados(formData);

      const disponibilidad: DisponibilidadPorEspecialidad = {
        especialidad: formData.especialidad,
        diasAtencion: diasAtencion,
        duracionTurno: formData.duracionTurno,
        desdeJornada: formData.desdeJornada,
        hastaJornada: formData.hastaJornada,
      };
      this.especialidadesSeleccionadas.push(formData.especialidad);
      this.disponibilidadPorEspecialidadArray.push(disponibilidad);
      console.log(this.disponibilidadPorEspecialidadArray);
      this.formDisponibilidad.reset();
    }

    function diasSeleccionados(formData: any) {
      const diasSeleccionados = [];
      if (formData.lunes) diasSeleccionados.push('lunes');
      if (formData.martes) diasSeleccionados.push('martes');
      if (formData.miercoles) diasSeleccionados.push('miercoles');
      if (formData.jueves) diasSeleccionados.push('jueves');
      if (formData.viernes) diasSeleccionados.push('viernes');
      if (formData.sabado) diasSeleccionados.push('sabado');
      const diasAtencion = diasSeleccionados.join(', ');
      return diasAtencion;
    }
  }

  registrarProfesional() {
    this.tipoUsuario = 'especialista';
    if (this.tipoUsuario === 'especialista') {
      this.EspecialidadService.todos().subscribe((data) => {
        this.especialidades = data;
      });
      this.form.addControl(
        'especialidadesCargadas',
        new FormControl('', Validators.required)
      );
      this.form.addControl(
        'imagenPerfil1',
        new FormControl('', Validators.required)
      );
   
    }
    
  }
  registrarPaciente() {
    this.tipoUsuario = 'paciente';
    if (this.tipoUsuario === 'paciente') {
      this.form.addControl(
        'obraSocial',
        new FormControl('', Validators.required)
      );
      this.form.addControl(
        'imagenPerfil1',
        new FormControl('', Validators.required)
      );
      this.form.addControl(
        'imagenPerfil2',
        new FormControl('', Validators.required)
      );

      this.ObrasSocialesService.todos().subscribe((data) => {
        this.obrasSociales = data;
      });
    } 
  }

  actualizarValorCaptcha(captchaPaso: boolean) {
    this.form.get('captcha')?.setValue(captchaPaso);
  }

  cargarImagen1($event: any) {
    this.imagenPerfil1 = $event.target.files[0];
  }
  cargarImagen2($event: any) {
    this.imagenPerfil2 = $event.target.files[0];
  }
}
