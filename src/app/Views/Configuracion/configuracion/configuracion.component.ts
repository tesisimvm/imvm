import { Component, OnInit } from '@angular/core';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {

  objTipoEstado:any;
  selectIDTipEstado = 0; /* Variable para capturar el valor del tipo de estado */
  objEstadosDelTipo:any;

  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDSesion: any;


  constructor(public servicio: BackenApiService) {
     //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
     this.ruta = window.location.pathname.split('/');
     this.IDUsuario = this.ruta[2];
     this.IDRol = this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
     this.IDSesion = this.ruta[4];
    this.getTipoReclamo();
  }
  
  ngOnInit(): void {}

  getTipoReclamo(): void {
    this.servicio.getTipoEstadoAdmin(this.IDRol).subscribe(
      (res) => {
        this.objTipoEstado = res; /* res es la respuesta del servidor con todos los objetos y sus datos */
        
      },
      (error) => console.error(error)
    );
  }

  obtenerIDTipoReclamo(ev: any) {
    debugger
    this.objEstadosDelTipo=0;
    this.selectIDTipEstado=0;
    
    this.selectIDTipEstado = ev.target.value;
   
    
    this.servicio.getEstadosDelTipo(this.selectIDTipEstado).subscribe(
      (res) => {
        this.objEstadosDelTipo = res; /* res es la respuesta del servidor con todos los objetos y sus datos */
        
      },
      (error) => console.error(error)
    )
    
  }

 
}
