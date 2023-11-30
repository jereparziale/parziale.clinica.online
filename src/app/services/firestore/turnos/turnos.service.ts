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
import { Turno } from 'src/app/models/turno';
@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private firestore: Firestore = inject(Firestore); 
  public instanciaFirestore = collection(this.firestore, 'turnos');
  public queryInstancia: any | undefined;
  private traerUnoSubscription: Subscription | undefined;



  todos(): Observable<any> {
    return collectionData(this.instanciaFirestore);
 }

 guardar(objetoJson:Turno) {
  const col = this.instanciaFirestore;
  const documento = doc(this.instanciaFirestore);
  objetoJson.idTurno=documento.id;
  return setDoc(documento,{
    ...objetoJson
  })
}

traerUno(idTurno: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('idTurno', '==', idTurno)
  );
  return collectionData(consulta);
}
traerPorFecha(fecha: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('dia', '==', fecha)
  );
  return collectionData(consulta);
}
traerPorEspecialista(especialistaEmail: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('especialistaEmail', '==', especialistaEmail)
  );
  return collectionData(consulta);
}
traerTurnosPorFechaRango(especialistaEmail: string,fechaInicio: string, fechaFin: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('dia', '>=', fechaInicio),
    where('dia', '<=', fechaFin),
    where('especialistaEmail', '==', especialistaEmail),
  );
  return collectionData(consulta);
}
traerTurnosFinalizadosPorFechaRango(especialistaEmail: string,fechaInicio: string, fechaFin: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('dia', '>=', fechaInicio),
    where('dia', '<=', fechaFin),
    where('estado', '==', 'realizado'),
    where('especialistaEmail', '==', especialistaEmail),
  );
  return collectionData(consulta);
}
traerPorPaciente(pacienteEmail: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('pacienteEmail', '==', pacienteEmail)
  );
  return collectionData(consulta);
}
traerPorDosCampos(campo1: string, valor1:string,campo2: string, valor2:string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where(campo1, '==', valor1),
    where(campo2, '==', valor2) 
  );
  return collectionData(consulta);
}
traerPorUnCampo(campo1: string, valor1:string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where(campo1, '==', valor1),
  );
  return collectionData(consulta);
}


traerPorPacienteYEspecialidad(pacienteEmail: string, especialidad: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('pacienteEmail', '==', pacienteEmail),
    where('especialidad', '==', especialidad) 
  );
  return collectionData(consulta);
}
traerPorEspecialistaYEspecialidad(especialistaEmail: string, especialidad: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('especialistaEmail', '==', especialistaEmail),
    where('especialidad', '==', especialidad) 
  );
  return collectionData(consulta);
}
traerPorPacienteYProfesional(especialistaEmail: string, pacienteEmail: string): Observable<any> {
  const consulta = query(
    this.instanciaFirestore,
    where('especialistaEmail', '==', especialistaEmail),
    where('pacienteEmail', '==', pacienteEmail) 
  );
  return collectionData(consulta);
}

modificarEstadoTurno(idTurno: string,estado:string,comentario:string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.traerUnoSubscription = this.traerUno(idTurno).subscribe((res) => {
      console.log(res[0])
      if (res[0]) {
        const id = idTurno;
        const col = collection(this.firestore, 'turnos');
        const documento = doc(col, id);
        updateDoc(documento, {
          estado: estado,
          comentario: comentario
        })
          .then(() => {
            console.log('modificado');
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
      }else{

      }
    });
  });
}
modificarCalificarAtencion(idTurno: string,nuevoEstado:string,atencion:any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.traerUnoSubscription = this.traerUno(idTurno).subscribe((res) => {
      console.log(res[0])
      if (res[0]) {
        const id = idTurno;
        const col = collection(this.firestore, 'turnos'); 
        const documento = doc(col, id);
        updateDoc(documento, {
          estado: nuevoEstado,
          atencion: atencion
        })
          .then(() => {
            console.log('modificado');
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
      }else{

      }
    });
  });
}
modificarCalificarEncuesta(idTurno: string,encuesta:string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.traerUnoSubscription = this.traerUno(idTurno).subscribe((res) => {
      console.log(res[0])
      if (res[0]) {
        const id = idTurno;
        const col = collection(this.firestore, 'turnos'); 
        const documento = doc(col, id);
        updateDoc(documento, {
          encuesta: encuesta
        })
          .then(() => {
            console.log('modificado');
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
      }else{

      }
    });
  });
}


}