import { Injectable, OnInit, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements OnInit{
  private auth: Auth = inject(Auth);
  usuarioAutenticado: boolean = false;
  usuarioEmail: any = '';
  constructor() {
  }
  ngOnInit(): void {
    console.log("oninit servicio")
    this.usuarioEmail=this.auth.currentUser?.email;
  }

  // retornarMailLogeado():string{
  //   if(this.auth.currentUser?.email){
  //     console.log(this.auth.currentUser);
  //     return this.auth.currentUser.email
  //   }
  //   console.log(this.auth.currentUser);

  //   return '';
  // }

  isLoggedIn(): boolean {
    this.usuarioEmail=this.auth.currentUser?.email;
    return this.auth.currentUser != null;
  }

  estadoLogObservable(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.usuarioAutenticado = true;
          this.usuarioEmail = user.email;
          observer.next(user);
        } else {
          this.usuarioAutenticado = false;
          this.usuarioEmail = null;
          observer.next(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    });
  }


  registro({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        const user = this.auth.currentUser;
        if (user) {
          return sendEmailVerification(user)
            .then(() => {
              
              return res; // Devuelve el resultado del registro
            })
            .catch((error) => {
              throw new Error('Error al enviar el correo de verificación: ' + error.message);
            });
        } else {
          throw new Error('Error: No se pudo obtener el usuario actual');
        }
      })
      .catch((error) => {
        throw new Error('Error al registrar el usuario: ' + error.message);
      });

  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth,email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  enviarEmailVerificacion() {
    const user = this.auth.currentUser;
    if (user) {
      sendEmailVerification(user);
        
    } else {
      console.log('No hay usuario autenticado para enviar correo de verificación');
    }
  }
  


}

  // registro({ email, password }: any) {
  //   return createUserWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }

  // login({ email, password }: any) {
  //   return signInWithEmailAndPassword(this.auth, email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);
      

  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
  // }

  // estadoLog(){

  //   return onAuthStateChanged(this.auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       const uid = user.uid;
  //       console.log(user);
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });

  // }