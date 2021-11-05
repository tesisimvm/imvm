import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Views/Sesion/registro/inicio-sesion.component';
import { LoginComponent } from './Views/Sesion/login/login.component';
import { MainNavComponent } from './Views/Estructura/main-nav/main-nav.component';
import { PerfilComponent } from './Views/Usuario/perfil/perfil.component';
import { ReclamosComponent } from './Views/Reclamo/reclamos/reclamos.component';
import { HistorialComponent } from './Views/Reclamo/historial/historial.component';
import { NosotrosComponent } from './Views/Estructura/nosotros/nosotros.component';
import { PprincipalComponent } from './pprincipal/pprincipal.component';
import { ConfiguracionComponent } from './Views/Configuracion/configuracion/configuracion.component';

const routes: Routes = [
  {path: '', component: InicioSesionComponent}, /* cuando se inicia el proyecto o cuando la url esta vacia */
  {path: 'inicio-sesion', component: InicioSesionComponent}, /* cuando te logueas para entrar a tu usuario */
  {path: 'login', component: LoginComponent}, /* para registrate */
  {path: 'perfil', component: PerfilComponent},
  {path: 'reclamos', component: ReclamosComponent},
  {path: 'nosotros', component: NosotrosComponent},
  
  // {path: 'pantallaprincipal', component: PprincipalComponent},
  {path: 'main-nav/:id/:id/:id', component: MainNavComponent,/* usuario/rol/idsesion */
    children:[
    {path: 'principal', component: PprincipalComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'reclamos', component: ReclamosComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'configuracion', component:ConfiguracionComponent}
  ]}, /* menu principal */

  {path: 'main-nav/:id/:id/:id/historial', component: MainNavComponent, /* Estando en el historial se puede ir a reclamo para editar ese detalle o reclamo */
    children:[
    {path: 'principal', component: PprincipalComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'reclamos', component: ReclamosComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'configuracion', component:ConfiguracionComponent}
  ]}, 
  
  
  {path: '**', component: InicioSesionComponent}, /* por defecto - cuando hay problemas o se escribe mal la url */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
