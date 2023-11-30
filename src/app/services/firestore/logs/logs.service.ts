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
@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private firestore: Firestore = inject(Firestore);
  public instanciaFirestore = collection(this.firestore, 'logs');

  todos(): Observable<any> {
    return collectionData(this.instanciaFirestore);
  }

  guardar(objetoJson:any) {
    const documento = doc(this.instanciaFirestore);
    return setDoc(documento,{
      ...objetoJson,
    })
  }













}
