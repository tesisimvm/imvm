import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagNosotrosComponent } from './nosotros/pag-nosotros/pag-nosotros.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: '', component: InicioSesionComponent}, /* cuando se inicia el proyecto o cuando la url esta vacia */
  {path: 'inicio-sesion', component: InicioSesionComponent}, /* cuando te logueas para entrar a tu usuario */
  {path: 'login', component: LoginComponent}, /* para registrate */
  {path: 'nosotros', component: PagNosotrosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'main-nav', component: MainNavComponent, children:[

    {path: 'perfil', component: PerfilComponent}
  ]}, /* menu principal */
  {path: '**', component: InicioSesionComponent}, /* por defecto - cuando hay problemas o se escribe mal la url */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
