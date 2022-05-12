import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecuentoRecAmbiental } from 'src/app/model/Dashboard/V_CantidadRecAmbientalUsuario';
import { CantReclamoMesyAnio } from 'src/app/model/Dashboard/V_CantidadRecPorMesyAnio';
import { RecuentoTipReclamos } from 'src/app/model/Dashboard/V_CantidadTipReclamoUsuario';
import { RecuentoTarjetas } from 'src/app/model/Dashboard/V_RecuentoReclamos';
import { RecuentoTotal } from 'src/app/model/Dashboard/V_RecuentoTotal';
import { BackenApiService } from 'src/app/service/backen-api.service';


@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.component.html',
  styleUrls: ['./pprincipal.component.css']
})
export class PprincipalComponent implements OnInit {
  txtAnio = new FormControl('', [Validators.required]);
  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDSesion: any;
  dataService = [];
  date = new Date();
  anio:any;
  
 
   

  recuentoTarjeta!: RecuentoTarjetas[]; /* cantidad de reclamos dependiendo del usuario */

  arregloRecuentoTotal!: RecuentoTotal[]; /* Cantidad total de reclamos */

  arregloTipoReclamos!:RecuentoTipReclamos[];

  arregloReclamosAmbientales!:RecuentoRecAmbiental[];

  arregloReclamosDeMesesyAnio!:CantReclamoMesyAnio[];
 
 

  constructor(private Estadistica: BackenApiService,private toastr: ToastrService) {
    /* Object.assign(this, { multi }); */
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
    this.getCantidadReclamosMesyAnio();
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

  /* Estadisticas de torta - tipos de reclamos ambientales */

  // options
  vistaTorta3:any[]=[100,100]
  showLegend3: boolean = true;
  showLabels3: boolean = true;
  animations3: boolean = true;
  showlabels3: boolean=true;
  gradient3:   boolean=true;

  legendtitle: string='Tip.Reclamos';
  legendPosicion3: string = 'right';

  
  /*------------------------------------------------------------- */

  /* tabla vertical - cantidad de reclamos pormes del año */
  
  // options
  showXAxis5 = true;
  showYAxis5 = true;
  gradient5 = true;
  showLegend5 = true;
  showXAxisLabel5 = true;
  animacionBarras:boolean=true;
  xAxisLabel5 = 'Meses - Año';
  showYAxisLabel5 = true;
  yAxisLabel5 = 'Cantidad';
  tituloLeyenda:string="Mes"
  


  colorScheme5 = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  getRecuentoTarjetas() {
    /* Admin */
    if(this.IDRol==1 || this.IDRol==2){
      this.Estadistica.getRecuentoReclamos().subscribe(
        (data) => {
          
         this.recuentoTarjeta=data;
         
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
   /* tarjeta con el total de reclamos */
  getRecuentoTotal() {
    /* Admin */
    if(this.IDRol==1 || this.IDRol==2){
      debugger
      this.Estadistica.getReclamosTotales(0,this.IDRol).subscribe(
        (resp) => {
          debugger
          this.arregloRecuentoTotal=resp;

          /* Se le adjunta el total a las tarjetas */
          this.recuentoTarjeta = this.recuentoTarjeta.concat(this.arregloRecuentoTotal);
          
        },
        (error) => {
          console.log(error);
        }
      );

    }else{
      this.Estadistica.getReclamosTotales(this.IDUsuario,this.IDRol).subscribe(
        (resp) => {
          this.arregloRecuentoTotal=resp;

          /* Se le adjunta el total a las tarjetas */
          this.recuentoTarjeta = this.recuentoTarjeta.concat(this.arregloRecuentoTotal);
          
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }

  /* Grafico Torta */
  getRecuentoTiposReclamos(){
    /* Administrador */
    if(this.IDRol==1 || this.IDRol==2){

      this.Estadistica.getRecuentoTiposReclamosUsuario(0,this.IDRol).subscribe(
        (info)=>{
          this.arregloTipoReclamos=info;
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      /* Usuario */
      this.Estadistica.getRecuentoTiposReclamosUsuario(this.IDUsuario,0).subscribe(
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

  /* Grafico de barras verticales al abrir pantalla */
  getCantidadReclamosMesyAnio(){
    debugger
      this.anio=this.date.getFullYear();

      this.Estadistica.getRecuentoReclamosDelAnio(this.IDUsuario,this.anio+'',this.IDRol).subscribe(
        (dato)=>{
          debugger
          this.arregloReclamosDeMesesyAnio=dato;
        },
        (error) => {
          console.log(error);
        }
      ) 

  }

  btnBuscarReclamosAnio(){
    if(this.txtAnio.value=='' || (this.txtAnio.value<2019 || this.txtAnio.value>this.anio)){
      this.toastr.info(
        'Ingrese un año valido.',
        'Atención',
        {
          timeOut: 5000,
          progressBar: true,
        }
      );

    }else{
     
        debugger
        this.Estadistica.getRecuentoReclamosDelAnio(this.IDUsuario,this.txtAnio.value,this.IDRol).subscribe(
          (dato)=>{
            this.arregloReclamosDeMesesyAnio=dato;
          },
          (error) => {
            console.log(error);
          }
        )
      
     
    }
    

  }

  

}
