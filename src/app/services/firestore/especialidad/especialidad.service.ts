import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private firestore: Firestore = inject(Firestore);
  public instanciaFirestore = collection(this.firestore, 'especialidades');
  public queryInstancia: any | undefined;


  todos(): Observable<any> {
    return collectionData(this.instanciaFirestore);
  }

}