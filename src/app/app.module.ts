import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
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
import { NosotrosComponent } from './Views/Estructura/nosotros/nosotros.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalEditarComponent } from './Views/Usuario/modal-editar/modal-editar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PprincipalComponent } from './Views/Estructura/pprincipal/pprincipal.component';
import {MatCardModule} from '@angular/material/card';



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
    ConfiguracionComponent,
    NosotrosComponent,
    ModalEditarComponent,
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
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgbModule,
    NgxChartsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
