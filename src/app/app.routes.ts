
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagNosotrosComponent } from './nosotros/pag-nosotros/pag-nosotros.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';


const app_routes: Routes = [

    {path: '', pathMatch: 'full', redirectTo: 'Home'},
    {path: 'InicioSesion', component: InicioSesionComponent},
    {path: 'Nosotros', component: PagNosotrosComponent},
    {path: 'Menu', component: MainNavComponent},
    {path: 'Registrarse', component: LoginComponent},
    {path: 'Perfil', component: PerfilComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Home'}

];

export const app_routing = RouterModule.forRoot(app_routes);