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
export class ObrasSocialesService {

  private firestore: Firestore = inject(Firestore);
  public instanciaFirestore = collection(this.firestore, 'obrasSociales');
  public queryInstancia: any | undefined;


  todos(): Observable<any> {
    return collectionData(this.instanciaFirestore);
  }

}