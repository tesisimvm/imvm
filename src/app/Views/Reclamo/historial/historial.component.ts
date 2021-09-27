import { Component, OnInit } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { EstadoReclamo } from 'src/app/model/filtrosHistorial/estadoReclamo';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  ruta:any;
  IDUsuario: any;
  IDRol:any;
  
  Dreclamos:any;
  TR: TipoReclamo[]=[]; /* le asigno el nombre del modelo a una variable */
  /* tiene que ser el mismo nombre sino angular no encuentra el modelo */

  FER:EstadoReclamo[]=[]; /* filtro estadoRecmo.ts */

  selectIDTipReclamo=0; /* Variable para capturar el valor del tipo de reclamo */

  constructor(public detalleReclamo:BackenApiService) { 
    
    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario =this.ruta[2];
    this.IDRol=this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    console.log(this.IDRol);
    

    this.getTipoReclamo();
    this.getDetalleReclamos()
  }

  ngOnInit(): void {
  }

  getDetalleReclamos(){
    this.detalleReclamo.getDetalleReclamoUsuario(this.IDUsuario).subscribe(
      (info) => {
        console.log(info);
        debugger

        this.Dreclamos = info;
        console.log(this.Dreclamos)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getTipoReclamo(): void {
    this.detalleReclamo.getTipoReclamo().subscribe(
      (res) => {
        this.TR = res; /* res es la respuesta del servidor con todos los objetos y sus datos */
        console.log('Recla:', this.TR);
      },
      (err) => console.error(err)
    );
  }

  obtenerIDTipoReclamo(ev: any) {
    debugger
    this.selectIDTipReclamo = ev.target.value;
    console.log(this.selectIDTipReclamo);
    this.getEstadoReclamo(this.selectIDTipReclamo);
  }

  getEstadoReclamo(idTipoReclamo:number){
    debugger
    this.detalleReclamo.getFiltroEstadoHistorial(idTipoReclamo).subscribe(
      (res)=>{
        this.FER=res;
        console.log("Estados Reclamos", this.FER);
      },
      (err)=> console.error(err)
      
    );

  }

}
