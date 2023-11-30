import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
  updateDoc,
  DocumentReference,
  doc,
  DocumentSnapshot,
  setDoc,
  
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Especialista } from 'src/app/models/usuarios/especialista';
import { Paciente } from 'src/app/models/usuarios/paciente';
 
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private firestore: Firestore = inject(Firestore);
  public instanciaFirestore = collection(this.firestore, 'usuarios');
  public queryInstancia: any | undefined; 
  public usuario: Paciente | Especialista | undefined;
  private traerUnoSubscription: Subscription | undefined;


  todos(tipoUsuario: string): Observable<any> {
    const consulta = query(
      this.instanciaFirestore,
      where('tipoUsuario', '==', tipoUsuario)
    );
    return collectionData(consulta);
  }

  // alta(data: Paciente | Especialista): Promise<any> {


  //   return addDoc(this.instanciaFirestore, data)
  //     .then(() => {
  //       console.log('Datos guardados exitosamente');
  //     })
  //     .catch((error) => {
  //       console.error('Error al guardar datos:', error);
  //     });
  // }

  // alta(data: Paciente | Especialista): Promise<any> {



  // }

  guardar(objetoJson:Paciente | Especialista) {
    const col = this.instanciaFirestore;
    const documento = doc(this.instanciaFirestore);
    console.log(documento.id) 
    console.log(documento)
    return setDoc(documento,{
      id: documento.id,
      ...objetoJson,
    })
  }

  ///Devuelve un observado donde se accese a la respuesta[0] y es un usuario
  traerUno(mail_usuario: string): Observable<any> {
    const consulta = query(
      this.instanciaFirestore,
      where('mail', '==', mail_usuario)
    );
    return collectionData(consulta);
  }
  traerEspecialistasPorEspecialidad(especialidadSeleccionada: string): Observable<any> {
    const consulta = query(
      this.instanciaFirestore,
      where('especialidades', 'array-contains', especialidadSeleccionada)
    );
    return collectionData(consulta);
  }
  
  verificarAcceso(mail_usuario: string): boolean {
    const consulta = query(
      this.instanciaFirestore,
      where('mail', '==', mail_usuario)
    );
    collectionData(consulta).subscribe((data: any) => {
      this.usuario = data[0];
      if (
        this.usuario instanceof Especialista &&
        this.usuario.accesoConcedido
      ) {
        return true;
      } else {
        return false;
      }
    });
    return false;
  }
  verificarAccesoAdministrador(mail_usuario: string): boolean {
    const consulta = query(
      this.instanciaFirestore,
      where('mail', '==', mail_usuario)
    );
    collectionData(consulta).subscribe((data: any) => {
      this.usuario = data[0];
      if(this.usuario){
        if (this.usuario.tipoUsuario === 'admin') {
          console.log(this.usuario)
          return true;
        } else {
          return false;
        }
      }
      return false;

      
    });
    return false;
  }

  darAcceso(mail_usuario: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.traerUnoSubscription = this.traerUno(mail_usuario).subscribe((res) => {
        // console.log('llamada');
        // console.log(res);
  
        if (res[0].accesoConcedido === false) {
          const id = res[0].id;
          // console.log(id);
  
          const col = collection(this.firestore, 'usuarios');
          const documento = doc(col, id);
  
          updateDoc(documento, {
            accesoConcedido: true,
          })
            .then(() => {
              console.log('acceso');
              resolve(); 
            })
            .catch(error => {
              console.error('Error:', error);
              reject(error); 
            })
            .finally(() => {
              if (this.traerUnoSubscription) {
                this.traerUnoSubscription.unsubscribe();
                this.traerUnoSubscription = undefined;
              }
            });
        }
      });
    });
  }
  

}


