import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EstadoReclamo } from 'src/app/model/filtrosHistorial/estadoReclamo';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  tipoReclamoCtrl = new FormControl('', [Validators.required]);
  estadoReclamoCtrl = new FormControl('', [Validators.required]);
  fechaDesdeCtrl = new FormControl('', [Validators.required]);
  fechaHastaCtrl = new FormControl('', [Validators.required]);
  nombreUsuarioCtrl = new FormControl('', [Validators.required]);
  formTarjetas = new FormControl('', [Validators.required]);

  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDSesion: any;

  Dreclamos: any;
  TR: TipoReclamo[] = []; /* le asigno el nombre del modelo a una variable */
  /* tiene que ser el mismo nombre sino angular no encuentra el modelo */

  estadosReclamoFiltro: any;
  fecha:any;

  public FER: EstadoReclamo[] = []; /* filtro estadoRecmo.ts */

  selectIDTipReclamo = 0; /* Variable para capturar el valor del tipo de reclamo */
  selectIDEstadoReclamo = 0; /* Variable para capturar el id del estado del tipo de reclamo */
  @Input() dataEntrante: any;
  objetoReclamo: any;

   filtroNombreUsuario:string=""; //se va usar para filtrar por nombre de usuario (hacer una validacion al crear el usuario, que no haya 2 usuarios con el mismo nombre )

   banderaIconoCarga:boolean =true;
   banderaAlerta:boolean=false;
   mensajeCarga:string='No Hay Reclamos...';


  constructor(
    public detalleReclamo: BackenApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario = this.ruta[2];
    this.IDRol =
      this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    this.IDSesion = this.ruta[4];
    console.log(this.IDRol);
    this.fechadehoy();
    this.getTipoReclamo();
    this.getDetalleReclamosHoy(); /* Traer los reclamos del dia de hoy */
  }

  ngOnInit(): void {}

  getDetalleReclamosHoy() {
    
    if (this.IDRol == 1 || this.IDRol == 2) {
      this.detalleReclamo.getHistorialHoy(this.fecha,this.IDUsuario,1,5,this.IDRol).subscribe(
        (info) => {
          console.log(info);

          if (info.length == 0) {
            this.banderaAlerta=true;
           
            this.banderaIconoCarga=false;
            this.toastr.info(
              'No se encuentran reclamos registrados en el dia de hoy ',
              'Atención',
              {
                timeOut: 3000,
                progressBar: true,
              }
            );
          }else{
            this.Dreclamos = info;
            console.log(info);
            this.banderaIconoCarga=false;
            console.log(
            'detalles de reclamos siendo admin o empleado: ',
            this.Dreclamos
          );
          }

          
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.detalleReclamo.getHistorialHoy(this.fecha,this.IDUsuario,1,5,this.IDRol).subscribe( /* getDetalleReclamoUsuario(this.IDUsuario, 1) */
        (info) => {
          console.log(info);
          this.banderaIconoCarga=false;
          this.Dreclamos = info;
          console.log('detalles de reclamos: ', this.Dreclamos);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getTipoReclamo(): void {
    this.detalleReclamo.getTipoReclamo().subscribe(
      (res) => {
        this.TR =
          res; /* res es la respuesta del servidor con todos los objetos y sus datos */
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

  getEstadoReclamo(idTipoReclamo: number) {
    
    this.detalleReclamo.getFiltroEstadoHistorial(idTipoReclamo).subscribe(
      (res) => {
        this.estadosReclamoFiltro = res;
        this.FER = res;

        console.log('Estados Reclamos', this.estadosReclamoFiltro);
      },
      (err) => console.error(err)
    );
  }
  obtenerIDEstadoReclamo(ev: any) {
    
    this.selectIDEstadoReclamo = ev.target.value;
    console.log('IDEstadoReclamo: ', this.selectIDEstadoReclamo);
  }

  /* Funcion para ir de la pantalla historial hacia el reclamo y editarlo */
  editarReclamo(idDetalle: any) {
    console.clear();

    this.router.navigate([
      'main-nav',
      this.IDUsuario,
      this.IDRol,
      this.IDSesion,
      'historial',
      'reclamos',
      idDetalle,
    ]);
  }

  btnBuscarReclamosFiltrados() {
    //NOTA: si busco todos los reclamos de ambiental tengo que hacer una nueva funcion para ese mismo estado, solamente es (23/02/2022)
    var filtroIDTReclamo: any;
    var filtroIDEstadoReclamo: any;
    var filtroFechaInicio: any;
    var filtroFechaFin: any;

    this.banderaIconoCarga=true; /* se activa para que la animacion refleje que se están cargando los reclamos solicitados */
    debugger
    /* Administrador y empleado */
    if (this.IDRol == 1 || this.IDRol == 2) {
      
      /* Busqueda por tipo reclamo y estado (no ingreso el nombre de usuario ni la fecha) */
      if ((this.tipoReclamoCtrl.value != '' && this.estadoReclamoCtrl.value!='') &&  this.nombreUsuarioCtrl.value=='' && this.fechaDesdeCtrl.value=='') {
        filtroIDTReclamo = this.selectIDTipReclamo;
        filtroIDEstadoReclamo = this.selectIDEstadoReclamo;
        this.detalleReclamo
          .getDetalleReclamoFiltrado(filtroIDTReclamo, filtroIDEstadoReclamo).subscribe(
            (res) => {
              this.formTarjetas.reset();
              delete this.Dreclamos;

              this.banderaIconoCarga =false; /* No se visualiza */
              this.banderaAlerta=false;/* No se visualiza */
              this.Dreclamos = res;
              if (res.length == 0) {
                this.banderaAlerta=true;/*se visualiza */
                this.toastr.info(
                  'No se encuentran reclamos registrados para la busqueda seleccionada ',
                  'Atención',
                  {
                    timeOut: 5000,
                    progressBar: true,
                  }
                );
              }
            },
            (err) => console.error(err)
          );
          /* Busqueda por tipo reclamo, estado y nombre (no ingresó la fecha) */
      }else if((this.tipoReclamoCtrl.value != '' && this.estadoReclamoCtrl.value!='') &&  this.nombreUsuarioCtrl.value!='' && this.fechaDesdeCtrl.value==''){
        filtroIDTReclamo = this.selectIDTipReclamo;
        filtroIDEstadoReclamo = this.selectIDEstadoReclamo;
        this.detalleReclamo
          .getDetalleReclamoFiltradoNombre(filtroIDTReclamo, filtroIDEstadoReclamo,this.nombreUsuarioCtrl.value).subscribe(
            (res) => {
              this.formTarjetas.reset();
              delete this.Dreclamos;
              debugger
              this.banderaIconoCarga =false; /* No se visualiza */
              this.banderaAlerta=false;/* No se visualiza */
              this.Dreclamos = res;
              if (res.length == 0) {
                this.banderaAlerta=true;/*se visualiza */
                this.toastr.info(
                  'No se encuentran reclamos registrados para la busqueda seleccionada ',
                  'Atención',
                  {
                    timeOut: 5000,
                    progressBar: true,
                  }
                );
              }
            },
            (err) => console.error(err)
          );
          /* Busqueda por nombre de usuario - siendo administrador */
      }else if((this.tipoReclamoCtrl.value=="" && this.estadoReclamoCtrl.value=="" )&& this.nombreUsuarioCtrl.value!=""){
        debugger
        this.filtroNombreUsuario = this.nombreUsuarioCtrl.value+'';
        this.detalleReclamo.getDetalleReclamoFiltradoNombreUsuario(this.filtroNombreUsuario).subscribe(
          (res) => {
            this.formTarjetas.reset();//elimino las tarjetas
            delete this.Dreclamos;//borro el objeto con toda la informacion
            
            this.Dreclamos = res;
            if (res.length == 0) {
              this.toastr.info(
                'No se encuentran reclamos registrados para la busqueda seleccionada ',
                'Atención',
                {
                  timeOut: 5000,
                  progressBar: true,
                }
              );
            }
          },
          (err) => console.error(err)
        );
        /* Busqueda por una fecha, estado y tiporeclamo */
      }else if((this.tipoReclamoCtrl.value!="" && this.estadoReclamoCtrl.value!="" )&& this.fechaDesdeCtrl.value!="" && this.nombreUsuarioCtrl.value==""){
        debugger;
        this.detalleReclamo.getDetalleReclamoPorfecha(this.tipoReclamoCtrl.value,this.estadoReclamoCtrl.value,this.fechaDesdeCtrl.value,this.IDRol).subscribe(
          (res)=>{
            debugger
            this.formTarjetas.reset();//elimino las tarjetas
            delete this.Dreclamos;//borro el objeto con toda la informacion
            this.banderaIconoCarga =false;
            this.banderaAlerta=false;
            this.Dreclamos = res;
            
            if (res.length == 0) {
              this.banderaAlerta=true;
              this.banderaIconoCarga=false;
              this.toastr.info(
                'No se encuentran reclamos registrados para la busqueda seleccionada ',
                'Atención',
                {
                  timeOut: 5000,
                  progressBar: true,
                }
              );
            }

            
          },
          (err)=>console.error(err)
        )
          /* Busqueda por tipo reclamo, estado reclamo, fecha y nombre de usuario */
      }else if((this.tipoReclamoCtrl.value!="" && this.estadoReclamoCtrl.value!="" )&& this.fechaDesdeCtrl.value!="" && this.nombreUsuarioCtrl.value!=""){
        
        this.detalleReclamo.getDetalleReclamoPorfechayNombreUsuario(this.tipoReclamoCtrl.value,this.estadoReclamoCtrl.value,this.fechaDesdeCtrl.value,this.IDRol,this.nombreUsuarioCtrl.value).subscribe(
          (res)=>{
            debugger
            this.formTarjetas.reset();//elimino las tarjetas
            delete this.Dreclamos;//borro el objeto con toda la informacion
            this.banderaIconoCarga =false;
            this.banderaAlerta=false;
            this.Dreclamos = res;
            
            if (res.length == 0) {
              this.banderaAlerta=true;
              this.banderaIconoCarga=false;
              this.toastr.info(
                'No se encuentran reclamos registrados para la busqueda seleccionada ',
                'Atención',
                {
                  timeOut: 5000,
                  progressBar: true,
                }
              );
            }

            
          },
          (err)=>console.error(err)
        )

      }else{
        this.banderaAlerta=true;
        this.banderaIconoCarga =false; 

        this.toastr.info(
          'No se puede realizar la accion deseasa',
          'Atención',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
      }

      /* {
        this.banderaAlerta=true;
        this.banderaIconoCarga =false; 

        this.toastr.info(
          'No se encuentran reclamos registrados para la busqueda seleccionada ',
          'Atención',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
      
    
      } */

    } else if(this.IDRol==3)  {
      /* Filtro por usuario */
      if (this.tipoReclamoCtrl.value != null) {
        filtroIDTReclamo = this.selectIDTipReclamo;
        filtroIDEstadoReclamo = this.selectIDEstadoReclamo;
        filtroFechaInicio = this.fechaDesdeCtrl.value;
        filtroFechaFin = this.fechaHastaCtrl.value;

        this.detalleReclamo
          .getDetalleReclamoFiltradoUsuario(
            filtroIDTReclamo,
            filtroIDEstadoReclamo,
            this.IDUsuario
          )
          .subscribe(
            (res) => {
              this.formTarjetas.reset();
              delete this.Dreclamos;

              this.Dreclamos = res;
              console.log(this.Dreclamos);
              if (res.length == 0) {
                this.toastr.info(
                  'No se encuentran reclamos registrados para la busqueda seleccionada ',
                  'Atención',
                  {
                    timeOut: 5000,
                    progressBar: true,
                  }
                );
              }
            },
            (err) => console.error(err)
          );
      }
    }
  }

  fechadehoy(){
    /* Fecha del fia de hoy, para mostrar los reclamos del este día */
    var today = new Date();
    var mes;
    mes=(today.getMonth()+1)
    if(mes==1|| mes==2||mes==3||mes==4||mes==5|| mes==6||mes==7||mes==8|| mes==9){
      mes='0'+mes;
    }
    this.fecha = today.getFullYear() + '-' + mes+'-'+ today.getDate();
    console.log('El dia de hoy es:'+this.fecha);

  }
}
