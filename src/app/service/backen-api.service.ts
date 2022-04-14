import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../model/reclamo';
import { sesionUsuario } from '../model/sesion';
import { datosperfil } from '../model/perfil';
import { TipoReclamo } from '../model/tipoReclamo';
import { ReclamoAmbiental } from '../model/reclamoAmbiental';
import { marca } from '../model/marca';
import { modelo } from '../model/modelo';
import { DetalleReclamo, DetalleReclamoActualizar, DetalleReclamoVehicularActualizar } from '../model/detalleReclamo';
import { EstadoReclamo } from '../model/filtrosHistorial/estadoReclamo';
import { Vehiculo } from '../model/vehiculo';




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

  /* Decorador */
  @Output() disparadorReclamos:EventEmitter<any> = new EventEmitter();

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

  metodoEditar(perfil:datosperfil){
    //console.log(id)
    //debugger
    return this.http.put('https://localhost:44363/usuario/' + perfil.IDUsuario,perfil);
  }
  

  /* Metodo para obtener todos reclamos (historial) */
  getDetalleReclamo(): Observable<any> {
    /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo');
  }
 /* Metodo para obtener todos reclamos del usuario (historial) */
  getDetalleReclamoUsuario(idUsuario:number,id:number): Observable<any> {
    /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo/'+idUsuario+'/'+id);/* por ahora el id es 1 =pendiente - trae todos los pendientes */
  }

  /* Metodo para obtener todos reclamos siendo administrador o empleado */
  getTodoslosDetalleReclamo(): Observable<any> {
    /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo/');/* por ahora el id es 1 =pendiente - trae todos los pendientes */
  }

  getHistorialHoy(fechaHoy:string,idUsuario:number,idEstadoA:number, idEstadoV:number,idRol:number):Observable<any>{
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/HistorialHoy?'+'fechaHoy='+fechaHoy+'&'+'idUsuario='+idUsuario+'&'+'idEstadoA='+idEstadoA+'&'+'idEstadoV='+idEstadoV+'&'+'idRol='+idRol);/*muestro los reclamos del dia de hoy y que sean estado pendiente (revisar) */

    /* HistorialHoy?fechaHoy=2021-09-28&idUsuario=4&idEstadoA=1&idEstadoV=5&idRol=3  */
  }

  /* Metodo usado para traer los datos necesarios para actualizar el reclamo AMBIENTAL */
  getDetalleReclamoParaActualizar(idDetalleR:number): Observable<any>{
    return this.http.get<DetalleReclamoActualizar[]>('https://localhost:44363/ActualizarReclamo/'+idDetalleR);
  }
  /* Metodo usado para traer los datos necesarios para actualizar el reclamo VEHICULAR */
  getDetalleReclamoVehicular(idDetalleR:number): Observable<any>{
    return this.http.get<DetalleReclamoVehicularActualizar[]>('https://localhost:44363/ActualizarRecVehicular/'+idDetalleR);
  }

  putActualizarReclamo(Recla: Reclamo):Observable<any>{
    var dato = JSON.stringify(Recla);
    debugger
    return this.http.put('https://localhost:44363/reclamo/'+Recla.IDReclamo,dato,this.httpOptions)
  }
  putActualizarDetalleReclamo(DetRecla: DetalleReclamo):Observable<any>{
    var dato = JSON.stringify(DetRecla);
    debugger
    return this.http.put('https://localhost:44363/detallereclamo/'+DetRecla.IDDetalleReclamo,dato,this.httpOptions)
  }
  /* Aca se usa cuando se cambia la marca del auto */
  putActualizarDetVehicular(DetoVehiculo: Vehiculo):Observable<any>{
    var dato = JSON.stringify(DetoVehiculo);
    debugger
    return this.http.put('https://localhost:44363/ActualizarRecVehicular/'+DetoVehiculo.IDVehiculo,dato,this.httpOptions)
  }


  /****** Filtros Histrial / tambien usado para los estados del reclamo para actualizar ******/
  getFiltroEstadoHistorial(idTipoReclamo:number): Observable<EstadoReclamo[]>{
    return this.http.get<EstadoReclamo[]>('https://localhost:44363/estadoreclamo/'+idTipoReclamo);
  }

  /****** Busqueda por filtros siendo admininistrador o empleado***/
  /* Busqueda por tipo reclamo y estado (no ingreso el nombre de usuario ni la fecha) */
  /*  https://localhost:44363/FiltrosReclamos?idtipor=1&idestado=1 */
  getDetalleReclamoFiltrado(idTipoR:number,idEstadoReclamo:number): Observable<any> {
    debugger
   /* https://localhost:44363/FiltrosReclamos?idtipor=1&&idestado=1 */
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltrosReclamos?'+'idtipor='+idTipoR+"&"+'idestado='+idEstadoReclamo);
  }
  /* Busqueda por tipo reclamo, estado y nombre (no ingresó la fecha) - administrador */
  getDetalleReclamoFiltradoNombre(idTipoR:number,idEstadoReclamo:number, nombreUsuario:string): Observable<any>{
    debugger
    return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltrosReclamos?'+'idtipor='+idTipoR+"&"+'idestado='+idEstadoReclamo+'&'+'nombreUsuario='+nombreUsuario);
  }

   /****** Busqueda por filtros siendo admininistrador o empleado***/
  getDetalleReclamoFiltradoUsuario(idTipoR:number,idEstadoReclamo:number,idUsuario:number): Observable<any> {
    debugger
   /* ,fechaInicio:string,fechaFin:string */
   /* return this.http.get<DetalleReclamo[]>('https://localhost:44363/detallereclamo); */
   return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltrosReclamos/'+idTipoR+'/'+idEstadoReclamo+'/'+idUsuario);
  }

  /* Busqueda de reclamos por filtro usando el nombre del usuario */
  getDetalleReclamoFiltradoNombreUsuario(nombreUsuario:string): Observable<any> {
    debugger
   /*https://localhost:44363/FiltroNombreReclamos?nombreUsuario=Omar */
   return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltroNombreReclamos?'+'nombreUsuario='+nombreUsuario);
  }

  /* Busqueda de reclamos por filtro usando tipo de reclamo, su estado y una fecha */

  getDetalleReclamoPorfecha(idTipoR:number,idEstadoReclamo:number,fechaDesde:string, idrol:number){
    /* https://localhost:44363/FiltroRangoFechas?idTipoReclamo=1&idEstado=1&fechaDesde=2021-10-13&fechaHasta=2021-10-22&idRol=1&nombreUsuario=- */

    return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltroRangoFechas?'+'idTipoReclamo='+idTipoR+'&'+'idEstado='+idEstadoReclamo+'&'+'fechaDesde='+fechaDesde+'&'+'idRol='+idrol);
  }

  /* Busqueda de reclamos por filtro usando tipo de reclamo, su estado y una fecha */

  getDetalleReclamoPorfechayNombreUsuario(idTipoR:number,idEstadoReclamo:number,fechaDesde:string, idrol:number,nombreUsuario:string ){
    /* https://localhost:44363/FiltroRangoFechas?idTipoReclamo=1&idEstado=1&fechaDesde=2021-10-13&fechaHasta=2021-10-22&idRol=1&nombreUsuario=- */

    return this.http.get<DetalleReclamo[]>('https://localhost:44363/FiltroRangoFechas?'+'idTipoReclamo='+idTipoR+'&'+'idEstado='+idEstadoReclamo+'&'+'fechaDesde='+fechaDesde+'&'+'idRol='+idrol+'&'+'nombreUsuario='+nombreUsuario);
  }



  


  /******* Vehiculo *******/
  postVehiculo(vehiculo: any):Observable<any>{
    debugger
    
    return this.http.post('https://localhost:44363/vehiculo', vehiculo, this.httpOptions);
  }
  postVehiculoxDetalle(vehiculoxDetalle: any):Observable<any>{
    debugger
    return this.http.post('https://localhost:44363/vehiculoxdetallereclamo', vehiculoxDetalle, this.httpOptions);
  }


}
