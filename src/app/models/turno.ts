interface Atencion {
  altura: string;
  peso: string;
  temperatura: string;
  presionSistole: string;
  presionDiastole: string;
  datosDinamicos: { clave: string; valor: string }[];
}

export class Turno {
    idTurno: string;
    dia: string;
    horario: string;
    nombrePaciente: string;
    pacienteEmail: string;
    nombreEspecialista: string;
    especialistaEmail: string;
    especialidad: string;
    estado: string;
    comentario: string;
    resena: string;
    encuesta: string;
    atencion?: Atencion;
  
    constructor(
      idTurno: string,
      dia: string,
      horario: string,
      nombrePaciente: string,
      pacienteEmail: string,
      nombreEspecialista: string,
      especialistaEmail: string,
      especialidad: string,
      estado: string,
      comentario: string,
      resena: string,
      encuesta: string,
      atencion?: Atencion
    ) {
      this.idTurno = idTurno;
      this.dia = dia;
      this.horario = horario;
      this.nombrePaciente = nombrePaciente;
      this.pacienteEmail = pacienteEmail;
      this.nombreEspecialista = nombreEspecialista;
      this.especialistaEmail = especialistaEmail;
      this.especialidad = especialidad;
      this.estado = estado;
      this.comentario = comentario;
      this.resena = resena;
      this.encuesta = encuesta;
      this.atencion = atencion;
    }
    toJson(): any {
      return {
        idTurno: this.idTurno,
        dia: this.dia,
        horario: this.horario,
        nombrePaciente: this.nombrePaciente,
        pacienteEmail: this.pacienteEmail,
        nombreEspecialista: this.nombreEspecialista,
        especialistaEmail: this.especialistaEmail,
        especialidad: this.especialidad,
        estado: this.estado,
        comentario: this.comentario,
        resena: this.resena,
        encuesta: this.encuesta,
        // Nueva propiedad
        atencion: JSON.stringify(this.atencion)
      };
    }
  }
  
  