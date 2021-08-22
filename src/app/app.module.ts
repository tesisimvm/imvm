import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MainNavComponent } from './Views/Estructura/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './Views/Sesion/login/login.component';
import { InicioSesionComponent } from './Views/Sesion/registro/inicio-sesion.component';
import { PerfilComponent } from './Views/Usuario/perfil/perfil.component';
import { ReclamosComponent } from './Views/Reclamo/reclamos/reclamos.component';
import { FooterComponent } from './Views/Estructura/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './Views/Usuario/usuario/usuario.component';
import { HistorialComponent } from './Views/Reclamo/historial/historial.component';
import { VehiculoComponent } from './Views/Vehiculo/vehiculo/vehiculo.component';
import { ConfiguracionComponent } from './Views/Configuracion/configuracion/configuracion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    InicioSesionComponent,
    PerfilComponent,
    ReclamosComponent,
    FooterComponent,
    UsuarioComponent,
    HistorialComponent,
    VehiculoComponent,
    ConfiguracionComponent
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
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
