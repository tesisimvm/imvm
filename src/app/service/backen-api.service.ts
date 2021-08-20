import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../model/reclamo';

@Injectable({
  providedIn: 'root',
})
export class BackenApiService {
  //cabeceras http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /* metodo get de reclamos */
  getReclamo(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>('https://localhost:44363/reclamo');
  }



  /* Pantalla Login (registro de usuario) */

  postUsuario(usuario: any ):Observable<any>{

    //let produ = JSON.stringify(prod);
    // let cabecera = new HttpHeaders();
    // cabecera.append('Content-Type', 'application/json');
    //debugger
    console.log(usuario);
    return this.http.post('https://localhost:44363/usuario',usuario,this.httpOptions);
  }


}
