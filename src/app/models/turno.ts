export class Turno {
    idTurno: string;
    dia: string;
    horario: string;
    pacienteEmail: string;
    especialistaEmail: string;
    especialidad: string;
    estado: string;
    comentario: string;
    resena: string;
    encuesta: string;
    atencion: string;
  
    constructor(
      idTurno: string,
      dia: string,
      horario: string,
      pacienteEmail: string,
      especialistaEmail: string,
      especialidad: string,
      estado: string,
      comentario: string,
      resena: string,
      encuesta: string,
      atencion: string
    ) {
      this.idTurno = idTurno;
      this.dia = dia;
      this.horario = horario;
      this.pacienteEmail = pacienteEmail;
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
        pacienteEmail: this.pacienteEmail,
        especialistaEmail: this.especialistaEmail,
        especialidad: this.especialidad,
        estado: this.estado,
        comentario: this.comentario,
        resena: this.resena,
        encuesta: this.encuesta,
        atencion: this.atencion
      };
    }
  }
  