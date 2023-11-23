import { Usuario } from "../usuario";

export class Paciente extends Usuario {

    // Atributos
    obraSocial: string;

  
    // Constructor
    constructor(nombre: string, apellido: string, edad: number, dni: string,  mail: string, tipoUsuario:string ,obraSocial: string) {
      super(nombre, apellido, edad, dni, mail,tipoUsuario);
      this.obraSocial = obraSocial;

    }

    override toJSON(): any {
      return {
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad,
        dni: this.dni,
        mail: this.mail,
        tipoUsuario: this.tipoUsuario,
        obraSocial: this.obraSocial,
      };
    }
  
  }
