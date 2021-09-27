import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../model/reclamo';
import { sesionUsuario } from '../model/sesion';
import { datosperfil } from '../model/perfil';
import { TipoReclamo } from '../model/tipoReclamo';
import { ReclamoAmbiental } from '../model/reclamoAmbiental';
import { marca } from '../model/marca';
import { modelo } from '../model/modelo';
import { DetalleReclamo } from '../model/detalleReclamo';
import { EstadoReclamo } from '../model/filtrosHistorial/estadoReclamo';



@Injectable({
  providedIn: 'root',
})
export class BackenApiService {
  //cabeceras http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  dato:any;
   respuesta:any;

  constructor(private http: HttpClient) {}

  /* metodo get de reclamos */
  getReclamo(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>('https://localhost:44363/reclamo');
  }

  postReclamo(Reclamo: any):Observable<any>{
    debugger
    console.log(Reclamo);
    return this.http.post('https://localhost:44363/reclamo', Reclamo, this.httpOptions);
  }

  postDetalleReclamo(Detallereclamo: any ):Observable<any>{
    return this.http.post('https://localhost:44363/detallereclamo', Detallereclamo, this.httpOptions);
  }

  getTipoReclamo(): Observable<TipoReclamo[]> {
    return this.http.get<TipoReclamo[]>('https://localhost:44363/tiporeclamo');
  }
 

  getReclamoAmbiental(): Observable<ReclamoAmbiental[]> {
    return this.http.get<ReclamoAmbiental[]>('https://localhost:44363/reclamoambiental');
  }

  getMarca(): Observable<marca[]> {
    return this.http.get<marca[]>('https://localhost:44363/marcavehiculo');
  }

  getModelo(): Observable<modelo[]> {
    return this.http.get<modelo[]>('https://localhost:44363/modeloVehiculo');
  }


  /* Pantalla Login (registro de usuario) */
  postUsuario(usuario: any ):Observable<any>{
    return this.http.post('https://localhost:44363/usuario', usuario, this.httpOptions);
  }

  /* Post inicio sesion - se registra el logueo del usuario */
  postInicioSesionUsuario(usuarioLogueado: any):Observable<any>{
    return this.http.post('https://localhost:44363/sesion', usuarioLogueado, this.httpOptions);
  }

  // getPerfil( usuario : any ): Observable<any>{
    
  //   console.log(usuario);
  //   return this.http.get('http://localhost:4200/usuario' , usuario);

  // }
  

  /* Pantalla sesion - validar usuario */
  getValidacionUsuario(email:any, pass:any): Observable<any> {
    console.log(email);
    console.log(pass);
    
    return this.http.get<sesionUsuario[]>('https://localhost:44363/sesion?'+"email="+email+"&"+"password="+pass); /* email=example@hotmail.com&password=123'); */
  }

  /*Obtener los datos del usuario segun el ID*/
  getdatosPerfil(id:any): Observable<datosperfil[]>{
    console.log(id)
    //debugger
    return this.http.get<datosperfil[]>('https://localhost:44363/usuario/' + id);
  }

  /* Metodo para obtener todos reclamos (historial) */
  getDetalleReclamo(): Observable<any> {
    /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo');
  }
 /* Metodo para obtener todos reclamos del usuario (historial) */
  getDetalleReclamoUsuario(idUsuario:number): Observable<any> {
    /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo/'+idUsuario);
  }

  /****** Filtros Histrial ******/


  getFiltroEstadoHistorial(id:number): Observable<EstadoReclamo[]>{
    return this.http.get<EstadoReclamo[]>('https://localhost:44363/estadoreclamo/'+id);

  }
}
