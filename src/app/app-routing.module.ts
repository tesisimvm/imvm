import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Views/Sesion/registro/inicio-sesion.component';
import { LoginComponent } from './Views/Sesion/login/login.component';
import { MainNavComponent } from './Views/Estructura/main-nav/main-nav.component';
import { PerfilComponent } from './Views/Usuario/perfil/perfil.component';
import { ReclamosComponent } from './Views/Reclamo/reclamos/reclamos.component';

const routes: Routes = [
  {path: '', component: InicioSesionComponent}, /* cuando se inicia el proyecto o cuando la url esta vacia */
  {path: 'inicio-sesion', component: InicioSesionComponent}, /* cuando te logueas para entrar a tu usuario */
  {path: 'login', component: LoginComponent}, /* para registrate */
  {path: 'perfil', component: PerfilComponent},
  {path: 'reclamos', component: ReclamosComponent},
  // {path: 'pantallaprincipal', component: PprincipalComponent},
  {path: 'main-nav', component: MainNavComponent,
    children:[
    {path: 'perfil', component: PerfilComponent},
    {path: 'reclamos', component: ReclamosComponent},
  ]}, /* menu principal */
  {path: '**', component: InicioSesionComponent}, /* por defecto - cuando hay problemas o se escribe mal la url */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
