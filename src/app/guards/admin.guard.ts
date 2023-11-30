import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/auth/user-auth.service';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/firestore/usuarios/usuario.service';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
    const authService = inject(UserAuthService);
    const usuarioService = inject(UsuarioService);
    const router = inject(Router);


  // Verifica si el usuario está autenticado.
  if (!authService.isLoggedIn()) {
    // El usuario no está autenticado, así que redirige a la página de inicio de sesión.
    router.navigate(['/auth']);
    return false;
  }

  // Obtiene el email del usuario autenticado.
  const email = authService.usuarioEmail;
  let isAdmin = false;

  //ver con async await y firstValueFrom de rxjs
  const traerUno$ = await usuarioService.traerUno(email) 
  const usuario = await firstValueFrom(traerUno$)
  if (usuario.tipoUsuario === 'admin') {
    isAdmin = usuario.admin;
  }
  


  // .subscribe((res) => {
  //   console.log(res);
  //   console.log(res[0].rol);

  //   if(res[0].rol === 'admin'){
  //     isAdmin=true;
  //     console.log(res[0]);
  //     return true;

  //   }else{
  //     console.log(isAdmin)
  //     console.log(email)
  //     // El usuario no es administrador, así que redirige a la página de inicio.
  //     router.navigate(['/']);
  //     return false;
  //   }
  //   });


    console.log(isAdmin)

  return false;
}

