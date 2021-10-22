import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../../../service/backen-api.service';
import { Reclamo } from '../../../model/reclamo';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { ReclamoAmbiental } from 'src/app/model/reclamoAmbiental';
import { marca } from 'src/app/model/marca';
import { modelo } from 'src/app/model/modelo';
import { FormControl, Validators } from '@angular/forms';
import { DetalleReclamo, vehiculoXDetalle } from 'src/app/model/detalleReclamo';
import { ToastrService } from 'ngx-toastr';
import { Vehiculo } from 'src/app/model/vehiculo';


@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css'],
})
export class ReclamosComponent implements OnInit {
  tipoReclamoCtrl = new FormControl('', [Validators.required]);
  reclamoAmbientalCtrl = new FormControl('', [Validators.required]);
  marcaAutoCtrl = new FormControl('', [Validators.required]);
  modeloAutoCtrl = new FormControl('', [Validators.required]);
  fechaCtrl = new FormControl('', [Validators.required]);
  horaCtrl = new FormControl('', [Validators.required]);
  ubicacionCtrl = new FormControl('', [Validators.required]);
  descripcionCtrl = new FormControl('', [Validators.required]);
  urlFotoCtrl = new FormControl('', [Validators.required]);
  alturaCtrl = new FormControl('', [Validators.required]);
  dominioCtrl = new FormControl('', [Validators.required]);
  ID_Reclamo = new FormControl('', [Validators.required]);

  recla: Reclamo = {
    fecha: '',
    foto: '',
    hora: '',
    ID_Sesion: 1,
    ID_TipoReclamo: 1,
    ID_Estado: 1,
  };
  /* cuando es ambiental */
  /*  RegistroDetReclamo: DetalleReclamo = {
    descripcion: '',
    direccion:'' ,
    altura:0 ,
    dominio:'' ,
    ID_ReclamoAmbiental:0 ,
    
    ID_Reclamo:0,
  }; */
  /* cuando es vehicular */

  Tiporecla: TipoReclamo[] = new Array<TipoReclamo>();

  ReclamoAmbie: ReclamoAmbiental[] = [];

  Mar: marca[] = [];

  Mod: modelo[] = [];

  validacionTipoReclamo: any;

  selectIdTipoReclamo: number = 0; //se establece en 0 para que no se muestren los combobox de los reclamos
  selectIdinfoReclamo: number = 0;
  selectIdMarcaVehiculo: number = 0;
  nombreTipoReclamo?: string;
  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDsesion: any;
  idrecambie: number = 0;
  ID_Vehiculo:any; /* se usa para saber el id que tiene el auto recien registrado */
  ID_DetReclamo:any; /* para vehiculoXDetalle */
  time:any;

  constructor(
    private toastr: ToastrService,
    private service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListReclamoAmbiental();
    this.getListMarca();
    this.getListModelo();
    this.obtenerHoraActual();

    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario = this.ruta[2];
    this.IDRol =
      this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    console.log(this.IDRol);
    this.IDsesion = this.ruta[4];

    console.clear();
  }

  ngOnInit(): void {
    this.getListTipoReclamos();
  }

  getListTipoReclamos(): void {
    this.service.getTipoReclamo().subscribe(
      (res) => {
        this.Tiporecla = res;
        console.log('Recla:', this.Tiporecla);
      },
      (err) => console.error(err)
    );
  }

  getListReclamoAmbiental(): void {
    this.service.getReclamoAmbiental().subscribe(
      (res) => {
        console.log(res);
        this.ReclamoAmbie = res;
      },
      (err) => console.error(err)
    );
  }

  getListMarca(): void {
    this.service.getMarca().subscribe(
      (res) => {
        this.Mar = res;
      },
      (err) => console.error(err)
    );
  }

  getListModelo(): void {
    this.service.getModelo().subscribe(
      (res) => {
        this.Mod = res;
      },
      (err) => console.error(err)
    );
  }
 
  registrarReclamo() {
    debugger
    /* Validacion en el caso que registre un input vacio o cambie de tipo de reclamo y tenga un input vacio */
    if (this.tipoReclamoCtrl.value==1 &&(
      /* reclamo Ambiental */
      this.tipoReclamoCtrl.value == '' ||
      this.reclamoAmbientalCtrl.value == '' ||
      this.fechaCtrl.value == '' ||
      this.horaCtrl.value == '' ||
      this.ubicacionCtrl.value == '' ||
      this.descripcionCtrl.value == '' ||
      this.urlFotoCtrl.value == '' ||
      this.alturaCtrl.value == '')
    ) {

      this.toastr.warning('Faltan datos por rellenar, verifique y podrá enviar su reclamo','Cuidado!',{
        timeOut:5000,
        progressBar:true,
      }
      );

      /* reclamo vial */
    }else if (this.tipoReclamoCtrl.value==2&& ((this.dominioCtrl.value == '' ||
    this.marcaAutoCtrl.value == '' ) &&
    this.tipoReclamoCtrl.value == '' ||
    this.fechaCtrl.value == '' ||
    this.horaCtrl.value == '' ||
    this.ubicacionCtrl.value == '' ||
    this.descripcionCtrl.value == '' ||
    this.urlFotoCtrl.value == '' ||
    this.alturaCtrl.value == '')){
      this.toastr.warning('Faltan datos por rellenar, verifique y podrá enviar su reclamo','Cuidado!',{
        timeOut:5000,
        progressBar:true,
      }
      );

    } else {
      var RegistroRecl: Reclamo = {
        fecha: this.fechaCtrl.value + '',
        foto: this.urlFotoCtrl.value + '',
        hora: this.horaCtrl.value + '',
        ID_Sesion: Number(this.IDsesion),
        ID_TipoReclamo: Number(this.selectIdTipoReclamo),
        ID_Estado: 1 /* estado Activo */,
      };
      /* Obtengo el id para validar mas adelante en el detalle si es ambiental o vial */
      this.validacionTipoReclamo = RegistroRecl.ID_TipoReclamo;
      debugger
     
      console.log(RegistroRecl);
      this.service.postReclamo(RegistroRecl).subscribe(
        (res) => {
          console.log('reclamo creado: ', res);
          this.registrarDetalleReclamo(
            res
          ); /* metodo para registrar el detalle */
        },
        (err) => console.error(err)
      );
    }
  }

  registrarDetalleReclamo(infoRec: any) {
    debugger;
    if (this.validacionTipoReclamo == 1) {
      /* Si es ambiental */
      debugger;
      var RegistroDetReclamo: DetalleReclamo = {
        descripcion: this.descripcionCtrl.value + '',
        direccion: this.ubicacionCtrl.value + '',
        altura: this.alturaCtrl.value,
        dominio: this.dominioCtrl.value + '',
        ID_ReclamoAmbiental: Number(this.selectIdinfoReclamo),
        /* ID_Vehiculo: Number(this.selectIdMarcaVehiculo), */
        ID_Reclamo: infoRec.idReclamo,
      };

      debugger
      this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
        (res) => {
          this.Notificacion();
          console.clear() /* limpio la consola */
          
        },
        (err) => console.error(err)
      );
    } else {
      debugger
      /* Cuando sea Vehicular */
      /* Primero el detalle de reclamo */
      var RegistroDetReclamo: DetalleReclamo = {
        descripcion: this.descripcionCtrl.value + '',
        direccion: this.ubicacionCtrl.value + '',
        altura: this.alturaCtrl.value,
        dominio: this.dominioCtrl.value + '',
        ID_ReclamoAmbiental:0,
        /* ID_Vehiculo: Number(this.selectIdMarcaVehiculo), */
        ID_Reclamo: infoRec.idReclamo,
      };
      /* DETALLE RECLAMO */
      this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
        (resDetRecla) => {
         
          this.ID_DetReclamo=resDetRecla.idDetalleReclamo;/* se guarda el ID del detalle de reclamo recien creado
          para no perder el dato y despues insertarlo en RegVehiculoxDetalle*/
          this.RegVehiculo();/* Se procede a realizar el registro del vehiculo  */

        },
        (err) => console.error(err)
      );
    }  
  }
  RegVehiculo(){
     /* segundo el vehiculo */
     
     var RegistroVehiculo: Vehiculo = {
       dominio: this.dominioCtrl.value + '',
       color: ' - ',
       numeroChasis: ' - ',
       numeroMotor: ' - ',
       ID_MarcaVehiculo: Number(this.selectIdMarcaVehiculo),
       ID_Estado: 12 /* 12 es activo y 13 es inactivo*/,
       ID_TipoVehiculo: 1 /* 1- Sin asignar */,
     };
     this.service.postVehiculo(RegistroVehiculo).subscribe(
       (resVehiculo) => {
         this.ID_Vehiculo=resVehiculo.idVehiculo;/* se guarda el ID del vehiculo recien creado
         para no perder el dato y despues insertarlo en RegVehiculoxDetalle*/
         this.RegVehiculoxDetalle();
 
       },
       (err) => console.error(err)
     );
  }
  RegVehiculoxDetalle(){
    
     /* Ahora el vehiculoXdetalle */
     var RegistroVehxDet: vehiculoXDetalle = {
       ID_Vehiculo: this.ID_Vehiculo,
       ID_DetalleReclamo: this.ID_DetReclamo,
     };
     debugger
     this.service.postVehiculoxDetalle(RegistroVehxDet).subscribe(
       (res) => {
         /* aca capturar el id del detalle de reclamo para insertarlo en vehiculoxDetalle */
         this.Notificacion()
         console.clear() /* limpio la consola */
       },
       (err) => console.error(err)
     );
  }
  dataChangedTipoReclamo(ev: any) {
    this.selectIdTipoReclamo = ev.target.value;
  }
  dataChangedIdMarcaVehiculo(ev: any) {
    this.selectIdMarcaVehiculo = ev.target.value;
  }
  /* metodo especifico para obtener el id del la seleccion de la causa del reclamo 
ambiental */
  obtenerID(ev: any) {
    this.selectIdinfoReclamo = ev.target.value;
  }

  obtenerHoraActual() {
    var today = new Date();
     this.time = today.getHours() + ':' + today.getMinutes();
  }

  Notificacion() {
    this.toastr.success(
      '¡Su reclamo fué creado correctamente!',
      'El estado del reclamo está pendiente'
    );
  }
}
