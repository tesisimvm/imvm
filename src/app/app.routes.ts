
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagNosotrosComponent } from './nosotros/pag-nosotros/pag-nosotros.component';


const app_routes: Routes = [

    {path: 'home', component: InicioSesionComponent},
    {path: 'nosotros', component: PagNosotrosComponent},
    {path: 'menu', component: MainNavComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

export const app_routing = RouterModule.forRoot(app_routes);