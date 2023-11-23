import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/auth/user-auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(UserAuthService);
    const router = inject(Router);

    // Verifica si el usuario está autenticado.
    if (!authService.isLoggedIn()) {
      // El usuario no está autenticado, así que redirige a la página de inicio de sesión.
      router.navigate(['/auth']);
      return false;
    }
  
    // El usuario está autenticado, así que permite el acceso a la ruta.
    return true;
  };
