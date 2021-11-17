import { Component, Input, OnInit } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  IDSesion:any;
  
  Dreclamos:any;
  TR: TipoReclamo[]=[]; /* le asigno el nombre del modelo a una variable */
  /* tiene que ser el mismo nombre sino angular no encuentra el modelo */

  FER:EstadoReclamo[]=[]; /* filtro estadoRecmo.ts */

  selectIDTipReclamo=0; /* Variable para capturar el valor del tipo de reclamo */
  @Input() dataEntrante:any;
  objetoReclamo:any;

  constructor(public detalleReclamo:BackenApiService, private router: Router) { 
    
    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario =this.ruta[2];
    this.IDRol=this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    this.IDSesion=this.ruta[4]
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
        

        this.Dreclamos = info;
        console.log("detalles de reclamos: ",this.Dreclamos)
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
    
    this.selectIDTipReclamo = ev.target.value;
    console.log(this.selectIDTipReclamo);
    this.getEstadoReclamo(this.selectIDTipReclamo);
  }

  getEstadoReclamo(idTipoReclamo:number){
    
    this.detalleReclamo.getFiltroEstadoHistorial(idTipoReclamo).subscribe(
      (res)=>{
        this.FER=res;
        console.log("Estados Reclamos", this.FER);
      },
      (err)=> console.error(err)
      
    );

  }
  
  /* Funcion para ir de la pantalla historial hacia el reclamo y editarlo */
  editarReclamo(idDetalle:any){
    console.clear();
    
    
    
    

    this.router.navigate(['main-nav', this.IDUsuario,this.IDRol,this.IDSesion,'historial','reclamos',idDetalle]);
   

  }

}
