import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './Views/Sesion/registro/inicio-sesion.component';
import { LoginComponent } from './Views/Sesion/login/login.component';
import { MainNavComponent } from './Views/Estructura/main-nav/main-nav.component';
import { PerfilComponent } from './Views/Usuario/perfil/perfil.component';
import { ReclamosComponent } from './Views/Reclamo/reclamos/reclamos.component';
import { HistorialComponent } from './Views/Reclamo/historial/historial.component';
import { NosotrosComponent } from './Views/Estructura/nosotros/nosotros.component';
import { PprincipalComponent } from './Views/Estructura/pprincipal/pprincipal.component';
import { ConfiguracionComponent } from './Views/Configuracion/configuracion/configuracion.component';
import { MapaComponent } from './Views/Mapas/mapa/mapa.component';
import { ModalEditarComponent } from './Views/Usuario/modal-editar/modal-editar.component';
import { path } from 'd3';


const routes: Routes = [
  /* primera pantalla al inicar el proyecto  */
  {path: '', component: InicioSesionComponent}, /* cuando se inicia el proyecto o cuando la url esta vacia */
  {path: 'inicio-sesion', component: InicioSesionComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'perfil', component: PerfilComponent},
  {path: 'reclamos', component: ReclamosComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'mapa', component: MapaComponent},
  
  
  
  // /* luego de iniciar sesion estas en el menu principal */
  {path: 'main-nav/:id/:id/:id', component: MainNavComponent,/* usuario/rol/idsesion */
    children:[
    {path: 'principal', component: PprincipalComponent},
    {path: 'perfil', component: PerfilComponent/*, children:[{path:'editarperfil',component:ModalEditarComponent}]*/},
    {path: 'reclamos', component: ReclamosComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'configuracion', component:ConfiguracionComponent},
    {path: 'mapa', component: MapaComponent},
    {path: '**', component: PprincipalComponent}
    
  ]}, /* menu principal */

  {path: 'main-nav/:id/:id/:id/historial', component: MainNavComponent, /* Estando en el historial se puede ir a reclamo para editar ese detalle o reclamo */
    children:[
  
    {path: 'reclamos/:id', component: ReclamosComponent},
  
    {path: 'principal', component: PprincipalComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'reclamos', component: ReclamosComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'configuracion', component:ConfiguracionComponent},
    {path: 'mapa', component: MapaComponent},
    {path: '**', component: PprincipalComponent}
  ]}, 
  
  /* {path: '**', component: PprincipalComponent} , */ /* por defecto - cuando hay problemas o se escribe mal la url */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
