import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'usuarios', loadChildren: () => import('./modules/usuarios-admin/usuarios-admin.module').then(m => m.UsuariosAdminModule)},
  { path: 'turnos', loadChildren: () => import('./modules/turnos/turnos.module').then(m => m.TurnosModule)},
  { path: 'mis_turnos', loadChildren: () => import('./modules/mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule)},
  { path: 'mi_perfil', loadChildren: () => import('./modules/mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule)},
  { path: 'mis_pacientes', loadChildren: () => import('./modules/mis-pacientes/mis-pacientes.module').then(m => m.MisPacientesModule)},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 