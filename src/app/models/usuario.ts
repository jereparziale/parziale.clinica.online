export class Usuario {
      // Atributos
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;
  mail: string;
  tipoUsuario:string;

  // Constructor
  constructor(nombre: string, apellido: string, edad: number, dni: string, mail: string,tipoUsuario: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.mail = mail;
    this.tipoUsuario = tipoUsuario;
  }

  toJSON(): any {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      dni: this.dni,
      mail: this.mail,
      tipoUsuario: this.tipoUsuario,
    };
  }


}
