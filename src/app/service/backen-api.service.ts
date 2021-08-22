import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../model/reclamo';
import { sesionUsuario } from '../model/sesion';

@Injectable({
  providedIn: 'root',
})
export class BackenApiService {
  //cabeceras http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  dato:any;

  constructor(private http: HttpClient) {}

  /* metodo get de reclamos */
  getReclamo(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>('https://localhost:44363/reclamo');
  }



  /* Pantalla Login (registro de usuario) */
  postUsuario(usuario: any ):Observable<any>{
    //debugger
    console.log(usuario);
    return this.http.post('https://localhost:44363/usuario', usuario, this.httpOptions);
  }


  /* Pantalla sesion - validar usuario */
  getValidacionUsuario(data:any): Observable<any> {
    console.log(data);
    debugger
    return this.http.get<sesionUsuario[]>('https://localhost:44363/sesion',data); /* email=example@hotmail.com&password=123'); */
  }


}
