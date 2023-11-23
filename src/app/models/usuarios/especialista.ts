import { Usuario } from "../usuario";

export class Especialista extends Usuario {

  // Atributos
  accesoConcedido: boolean;

  especialidades: string[];
  disponibilidadPorEspecialidad: {
      especialidad: string;
      diasAtencion: string;
      duracionTurno: number;
      desdeJornada: number;
      hastaJornada: number;
  }[];

  // Constructor
  constructor(
    nombre: string,
    apellido: string,
    edad: number,
    dni: string,
    mail: string,
    tipoUsuario:string,
    especialidades: string[],
    disponibilidadPorEspecialidad: {
      especialidad: string;
      diasAtencion: string;
      duracionTurno: number;
      desdeJornada: number;
      hastaJornada: number;
    }[],
    accesoConcedido: boolean,
  ) {
    super(nombre, apellido, edad, dni, mail,tipoUsuario);
    this.especialidades = especialidades;
    this.disponibilidadPorEspecialidad = disponibilidadPorEspecialidad;
    this.accesoConcedido = accesoConcedido;
  }

  override toJSON(): any {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      dni: this.dni,
      mail: this.mail,
      tipoUsuario: this.tipoUsuario,
      especialidades: this.especialidades,
      disponibilidadPorEspecialidad: this.disponibilidadPorEspecialidad.map((disponibilidad) => ({
        especialidad: disponibilidad.especialidad,
        diasAtencion: disponibilidad.diasAtencion,
        duracionTurno: disponibilidad.duracionTurno,
        desdeJornada: disponibilidad.desdeJornada,
        hastaJornada: disponibilidad.hastaJornada,
      })),
      accesoConcedido: this.accesoConcedido,
    };
  }


}

