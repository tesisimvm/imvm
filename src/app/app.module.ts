import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PagNosotrosComponent } from './nosotros/pag-nosotros/pag-nosotros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReclamosComponent } from './reclamos/reclamos.component';
import { FooterComponent } from './footer/footer.component';
import { PprincipalComponent } from './pprincipal/pprincipal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    InicioSesionComponent,
    PagNosotrosComponent,
    PerfilComponent,
    ReclamosComponent,
    FooterComponent,
    PprincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule, /* agregado */
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
