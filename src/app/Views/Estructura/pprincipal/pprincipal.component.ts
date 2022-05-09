import { Component, NgModule, OnInit } from '@angular/core';
import { RecuentoRecAmbiental } from 'src/app/model/Dashboard/V_CantidadRecAmbientalUsuario';
import { RecuentoTipReclamos } from 'src/app/model/Dashboard/V_CantidadTipReclamoUsuario';
import { RecuentoTarjetas } from 'src/app/model/Dashboard/V_RecuentoReclamos';
import { RecuentoTotal } from 'src/app/model/Dashboard/V_RecuentoTotal';
/* import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */
/* import { tipoDeReclamo } from 'src/app/model/Dashboard/tiposReclamo'; */
/* import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; */
import { BackenApiService } from 'src/app/service/backen-api.service';
import {multi} from './data'

@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.component.html',
  styleUrls: ['./pprincipal.component.css']
})
export class PprincipalComponent implements OnInit {
  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDSesion: any;
  dataService = [];
  multi = [];

  recuentoTarjeta!: RecuentoTarjetas[]; /* cantidad de reclamos dependiendo del usuario */

  arregloRecuentoTotal!: RecuentoTotal[]; /* Cantidad total de reclamos */

  arregloTipoReclamos!:RecuentoTipReclamos[];

  arregloReclamosAmbientales!:RecuentoRecAmbiental[];
 

  constructor(private Estadistica: BackenApiService) {
    Object.assign(this, { multi });
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario = this.ruta[2];
    this.IDRol =
      this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    this.IDSesion = this.ruta[4];

    console.clear();
    this.getRecuentoTarjetas();
    this.getRecuentoTotal();
    this.getRecuentoTiposReclamos();
    this.getRecuentoRecAmbientales();
  }


  ngOnInit(): void {
    // this.data=tipoDeReclamo[];
  }

  colorScheme = {
    domain: ['#a8385d', '#E44D25', '#5AA454', '#aae3f5', '#CFC0BB'],
  };
  cardColor: string = '#232837';
 
  
  onSelect(event: any) {} 


  /*----------------------------------------------------------------------------------------------------  */

  /* Estaditicas formato Torta */
  /* viewTorta: any[] = [700, 900]; */

  // options
  gradientTorta: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  animations2: boolean = true;
  legendPosition: string = 'right';
  legendtitleTorta:string='Tip.Reclamos';

  colorSchemeTorta = {
    domain: ['#5AA454', '#FFAE00', '#C7B42C', '#AAAAAA']
  };
  
  /*------------------------------------------------------------- */

  /* Estadisticas porcentuales */

  view3: any[] = [500, 400];

  // options
  showLegend3: boolean = true;
  showLabels3: boolean = true;
  animations3: boolean = true;
  legendtitle:string='Tip.Reclamos';

 /*  colorScheme3 = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  }; */

  
  /*------------------------------------------------------------- */

  /* tabla vertical agrupada por fechas */

  view4: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient4: boolean = true;
  showLegend4: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';
  animations4: boolean = true;

  colorScheme4 = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  

 

  getRecuentoTarjetas() {
    /* Admin */
    if(this.IDRol==1 || this.IDRol==2){
      this.Estadistica.getRecuentoReclamos().subscribe(
        (data) => {
          debugger 
         this.recuentoTarjeta=data;
         debugger
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.Estadistica.getCantidadReclamosUsuario(this.IDUsuario).subscribe(
        (data) => {
          
         this.recuentoTarjeta=data;
        },
        (error) => {
          console.log(error);
        }
      );
    }  
  }

  getRecuentoTotal() {
    /* Admin */
    if(this.IDRol==1 || this.IDRol==2){

    }else{
      this.Estadistica.getReclamosTotales(this.IDUsuario).subscribe(
        (resp) => {
          this.arregloRecuentoTotal=resp;

          /* Se le adjunta el total a las tarjetas */
          this.recuentoTarjeta = this.recuentoTarjeta.concat(this.arregloRecuentoTotal);
          debugger
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }

  /* Grafico Torta */
  getRecuentoTiposReclamos(){
    if(this.IDRol==1 || this.IDRol==2){

    }else{
      debugger
      this.Estadistica.getRecuentoTiposReclamosUsuario(this.IDUsuario).subscribe(
        (info)=>{
          this.arregloTipoReclamos=info;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  /* grafico de porcentajes */
  getRecuentoRecAmbientales(){
    if(this.IDRol==1 || this.IDRol==2){

    }else{
      this.Estadistica.getRecuentoReclamosAmbientalesUsuario(this.IDUsuario).subscribe(
        (dato)=>{
          this.arregloReclamosAmbientales=dato;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

}
