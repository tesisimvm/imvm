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
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  dato:any;

  constructor(private http: HttpClient) {}

  /* metodo get de reclamos */
  getReclamo(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>('https://localhost:44363/reclamo');
  }



  /* Pantalla Login (registro de usuario) */
  postUsuario(usuario: any ):Observable<any>{
   
    console.log(usuario);
    debugger
    return this.http.post('https://localhost:44363/usuario', usuario, this.httpOptions);
  }


  /* Pantalla sesion - validar usuario */
  getValidacionUsuario(email:any,pass:any): Observable<any> {
    console.log(email);
    console.log(pass);
    debugger
    return this.http.get<sesionUsuario[]>('https://localhost:44363/sesion?'+"email="+email+"&"+"password="+pass); /* email=example@hotmail.com&password=123'); */
  }


}
