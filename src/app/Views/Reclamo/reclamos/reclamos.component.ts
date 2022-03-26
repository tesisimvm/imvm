import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../../../service/backen-api.service';
import { Reclamo } from '../../../model/reclamo';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { ReclamoAmbiental } from 'src/app/model/reclamoAmbiental';
import { marca } from 'src/app/model/marca';
import { modelo } from 'src/app/model/modelo';
import { FormControl, Validators } from '@angular/forms';
import {
  DetalleReclamo,
  DetalleReclamoActualizar,
  vehiculoXDetalle,
} from 'src/app/model/detalleReclamo';
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
  estadoReclamoCtrl = new FormControl('', [
    Validators.required,
  ]); /* Se utiliza al actualizar */

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
  public arregloDetalleReclamo: any;

  validacionTipoReclamo: any;

  selectIdTipoReclamo: number = 0; //se establece en 0 para que no se muestren los combobox de los reclamos
  selectIdinfoReclamo: number = 0;
  selectIdMarcaVehiculo: number = 0;
  nombreTipoReclamo?: string;
  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDsesion: any;
  IDDetalleR: any; /* ID DE LA RUTA DEL NAVEGADOR */
  idrecambie: number = 0;
  ID_Vehiculo: any; /* se usa para saber el id que tiene el auto recien registrado */
  ID_DetReclamo: any; /* para vehiculoXDetalle */
  time: any;
  banderaEdicionReclamo: boolean =
    false; /* se utiliza para validar controles cuando se navega desde historial hacia reclamo */

  objetoHistorial: any;
  idEstadoReclamo: any;
  objetEstadoReclamo: any;

  public datosHistorial: Array<any> = [];

  constructor(
    private toastr: ToastrService,
    private service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListReclamoAmbiental();
    this.getListMarca();
    this.getListModelo();
    /* this.obtenerHoraActual(); */

    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario = this.ruta[2];
    this.IDRol =
      this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    this.IDsesion = this.ruta[4];
    this.IDDetalleR = this.ruta[7];
    console.log(this.IDRol);
    console.log('ruta: ', this.ruta);
    console.log(' iddetalle: ', this.ruta[7]);

    /* Con este metodo traigo el reclamo y toda su información */
    debugger;
    this.metodo_VisualEditarReclamo(this.IDDetalleR);

    /* console.clear(); */
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
  getListEstadosReclamos(): void {
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
    debugger;
    /* Validacion en el caso que registre un input vacio o cambie de tipo de reclamo y tenga un input vacio */
    if (
      this.tipoReclamoCtrl.value == 1 &&
      /* reclamo Ambiental */
      (this.tipoReclamoCtrl.value == '' ||
        this.reclamoAmbientalCtrl.value == '' ||
        this.fechaCtrl.value == '' ||
        this.horaCtrl.value == '' ||
        this.ubicacionCtrl.value == '' ||
        this.descripcionCtrl.value == '' ||
        this.urlFotoCtrl.value == '' ||
        this.alturaCtrl.value == '')
    ) {
      this.toastr.warning(
        'Faltan datos por rellenar, verifique y podrá enviar su reclamo',
        'Cuidado!',
        {
          timeOut: 5000,
          progressBar: true,
        }
      );

      /* reclamo vial */
    } else if (
      this.tipoReclamoCtrl.value == 2 &&
      (((this.dominioCtrl.value == '' || this.marcaAutoCtrl.value == '') &&
        this.tipoReclamoCtrl.value == '') ||
        this.fechaCtrl.value == '' ||
        this.horaCtrl.value == '' ||
        this.ubicacionCtrl.value == '' ||
        this.descripcionCtrl.value == '' ||
        this.urlFotoCtrl.value == '' ||
        this.alturaCtrl.value == '')
    ) {
      this.toastr.warning(
        'Faltan datos por rellenar, verifique y podrá enviar su reclamo',
        'Cuidado!',
        {
          timeOut: 5000,
          progressBar: true,
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
      debugger;

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

      debugger;
      this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
        (res) => {
          this.Notificacion();
          console.clear(); /* limpio la consola */
          this.limpiarPantalla();
        },
        (err) => console.error(err)
      );
    } else {
      debugger;
      /* Cuando sea Vehicular */
      /* Primero el detalle de reclamo */
      var RegistroDetReclamo: DetalleReclamo = {
        descripcion: this.descripcionCtrl.value + '',
        direccion: this.ubicacionCtrl.value + '',
        altura: this.alturaCtrl.value,
        dominio: this.dominioCtrl.value + '',
        ID_ReclamoAmbiental: 0,
        /* ID_Vehiculo: Number(this.selectIdMarcaVehiculo), */
        ID_Reclamo: infoRec.idReclamo,
      };
      /* DETALLE RECLAMO */
      this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
        (resDetRecla) => {
          this.ID_DetReclamo =
            resDetRecla.idDetalleReclamo; /* se guarda el ID del detalle de reclamo recien creado
          para no perder el dato y despues insertarlo en RegVehiculoxDetalle*/
          this.RegVehiculo(); /* Se procede a realizar el registro del vehiculo  */
        },
        (err) => console.error(err)
      );
    }
  }
  RegVehiculo() {
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
        this.ID_Vehiculo =
          resVehiculo.idVehiculo; /* se guarda el ID del vehiculo recien creado
         para no perder el dato y despues insertarlo en RegVehiculoxDetalle*/
        this.RegVehiculoxDetalle();
      },
      (err) => console.error(err)
    );
  }
  RegVehiculoxDetalle() {
    /* Ahora el vehiculoXdetalle */
    var RegistroVehxDet: vehiculoXDetalle = {
      ID_Vehiculo: this.ID_Vehiculo,
      ID_DetalleReclamo: this.ID_DetReclamo,
    };
    debugger;
    this.service.postVehiculoxDetalle(RegistroVehxDet).subscribe(
      (res) => {
        /* aca capturar el id del detalle de reclamo para insertarlo en vehiculoxDetalle */
        this.Notificacion();
        console.clear(); /* limpio la consola */
        this.limpiarPantalla();
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

  limpiarPantalla() {
    this.tipoReclamoCtrl.reset();
    this.reclamoAmbientalCtrl.reset();
    this.marcaAutoCtrl.reset();
    this.modeloAutoCtrl.reset();
    this.fechaCtrl.reset();
    this.horaCtrl.reset();
    this.ubicacionCtrl.reset();
    this.descripcionCtrl.reset();
    this.urlFotoCtrl.reset();
    this.alturaCtrl.reset();
    this.dominioCtrl.reset();

    this.toastr.info('Será redirigido al menú principal', '', {
      timeOut: 9000,
      progressBar: true,
    });
    this.metodoRedireccion();
  }
  metodoRedireccion() {
    this.banderaEdicionReclamo = false;
    delete this.arregloDetalleReclamo;
    console.log(this.arregloDetalleReclamo);
    this.router.navigate([
      'main-nav',
      this.IDUsuario,
      this.IDRol,
      this.IDsesion,
      'principal',
    ]);
  }

  metodo_VisualEditarReclamo(IDDetalle: any) {
    debugger;
    /* Este metodo se utiliza para controlar lo que se quiere ver cuando se desea editar un reclamo */
    if (this.ruta[5] == 'historial' && IDDetalle != undefined) {
      this.banderaEdicionReclamo = true;

      /* Metodo en el cual se usa para traer todos los datos del reclamo a actualizar */
      this.service.getDetalleReclamoParaActualizar(IDDetalle).subscribe(
        (info) => {
          debugger;
          /* Acá pregunto si es ambiental o vial, si es ambiental sigo lo comun si es vial traigo los datos del auto */
          if (info[0].idTipoRec == 1) {
            this.arregloDetalleReclamo = info;
            console.log('Array detalle Reclamo: ', this.arregloDetalleReclamo);
          } else {
            debugger;
            delete this.arregloDetalleReclamo;
            this.getDetalleVehicularParaActualizar(info[0].idDetalleReclamo);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.banderaEdicionReclamo == false;
    }
  }
  getDetalleVehicularParaActualizar(idDetalleReclamo: number) {
    debugger;

    this.service.getDetalleReclamoVehicular(idDetalleReclamo).subscribe(
      (info) => {
        debugger;

        this.arregloDetalleReclamo = info;
        console.log(
          'Array detalle Reclamo Vehicular: ',
          this.arregloDetalleReclamo
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dataChangedEstadoReclamo(ev: any) {
    /* Capturo el id del tipo de reclamo y luego lo uso para traer sus estados */
    this.idEstadoReclamo = ev.target.value;
    this.service.getFiltroEstadoHistorial(this.idEstadoReclamo).subscribe(
      (data) => {
        this.objetEstadoReclamo = data;
        console.log(this.objetEstadoReclamo);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /* MetodoEstadoReclamo(id:any){
    console.log("EstadoReclamo: ",id)
  } */

  MetodoActualizarReclamo() {
    debugger
    /* idEstadoReclamo */
    /* Roles 1=Administrador - 3=Usuario */
    if (this.estadoReclamoCtrl.value == '' && this.IDRol==1) {
      this.toastr.warning(
        'Para realizar la actualización ingrese el estado correspondiente al reclamo',
        'Atención',
        {
          timeOut: 5000,
          progressBar: true,
        }
      );
    }else if(this.arregloDetalleReclamo[0].idTipoRec != this.idEstadoReclamo &&  this.IDRol==1){ 
      this.toastr.warning(
        'Seleccione el estado correcto del reclamo',
        'Atención',
        {
          timeOut: 5000,
          progressBar: true,
        }
      );
    }else {
      var putfecha: any;
      var putfoto: any;
      var puthora: any;
      var putID_TipoReclamo: any;
      var putID_Estado: any;
      debugger;

      if (this.estadoReclamoCtrl.value == '') {
        putID_Estado = this.arregloDetalleReclamo[0].idEstado;
      }
      if (this.estadoReclamoCtrl.value != '') {
        putID_Estado = Number(this.estadoReclamoCtrl.value);
      }
      if (this.tipoReclamoCtrl.value == '') {
        putID_TipoReclamo = this.arregloDetalleReclamo[0].idTipoRec;
      }
      if (this.tipoReclamoCtrl.value != '') {
        putID_TipoReclamo = Number(this.selectIdTipoReclamo);
      }
      if (this.fechaCtrl.value == '') {
        putfecha = this.arregloDetalleReclamo[0].fecha;
      }
      if (this.fechaCtrl.value != '') {
        putfecha = this.fechaCtrl.value + '';
      }
      debugger;
      if (this.horaCtrl.value == '') {
        puthora = this.arregloDetalleReclamo[0].hora;
      }

      if (this.horaCtrl.value != '') {
        puthora = this.horaCtrl.value + '';
      }
      if (this.urlFotoCtrl.value == '') {
        putfoto = this.arregloDetalleReclamo[0].foto;
      }
      if (this.urlFotoCtrl.value != '') {
        putfoto = this.urlFotoCtrl.value + '';
      }

      var reclamo: Reclamo = {
        IDReclamo: this.arregloDetalleReclamo[0].iD_Reclamo,
        fecha: putfecha,
        foto: putfoto,
        hora: puthora,
        ID_Sesion: this.arregloDetalleReclamo[0].idSesion,
        ID_TipoReclamo: putID_TipoReclamo,
        ID_Estado: putID_Estado,
      };

      console.log('reclamo actualizado: ', reclamo);

      this.service.putActualizarReclamo(reclamo).subscribe(
        (data) => {
          debugger;
          console.log(data);
          this.MetodoActualizarDetalleReclamo();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  MetodoActualizarDetalleReclamo() {
    var putDescripcion: any;
    var putUbicacion: any;
    var putAltura: any;
    var putDominio: any;
    var putID_ReclamoAmbiental: any;

    if (this.selectIdinfoReclamo == 0) {
      putID_ReclamoAmbiental = this.arregloDetalleReclamo[0].idRecAmb;
    }
    if (this.selectIdinfoReclamo != 0) {
      putID_ReclamoAmbiental = Number(this.selectIdinfoReclamo);
    }

    if (this.descripcionCtrl.value == '') {
      putDescripcion = this.arregloDetalleReclamo[0].descripcion;
    }
    if (this.descripcionCtrl.value != '') {
      putDescripcion = this.descripcionCtrl.value + '';
    }
    debugger;
    if (this.ubicacionCtrl.value == '') {
      putUbicacion = this.arregloDetalleReclamo[0].direccion;
    }
    if (this.ubicacionCtrl.value != '') {
      putUbicacion = this.ubicacionCtrl.value + '';
    }
    if (this.alturaCtrl.value == '') {
      putAltura = this.arregloDetalleReclamo[0].altura;
    }
    if (this.alturaCtrl.value != '') {
      putAltura = this.alturaCtrl.value + '';
    }
    if (this.dominioCtrl.value == '') {
      putDominio = this.arregloDetalleReclamo[0].dominio;
    }
    if (this.dominioCtrl.value != '') {
      putDominio = this.dominioCtrl.value + '';
    }
    debugger;
    var detalleReclamo: DetalleReclamo = {
      IDDetalleReclamo: Number(this.arregloDetalleReclamo[0].idDetalleReclamo),
      descripcion: String(putDescripcion),
      direccion: String(putUbicacion),
      altura: Number(putAltura),
      dominio: String(putDominio),
      ID_ReclamoAmbiental: Number(putID_ReclamoAmbiental),
      ID_Reclamo: Number(this.arregloDetalleReclamo[0].iD_Reclamo),
    };
    console.log('Detalle :', detalleReclamo);
    this.service.putActualizarDetalleReclamo(detalleReclamo).subscribe(
      (data) => {
        debugger;
        /*1= reclamo ambiental  */
        if (this.arregloDetalleReclamo[0].idTipoRec == 1) {
          console.log(data);
          this.ResetearFormulariosActualizacionReclamo();
          this.metodo_VisualEditarReclamo(this.IDDetalleR);
        } else if (this.arregloDetalleReclamo[0].idTipoRec == 2) {
          this.MetodoActualizarVehiculo();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  MetodoActualizarVehiculo() {
    var putIDVehiculo: any;
    var putDominio: any;
    var putID_Marca: any;
    debugger;

    if (this.selectIdMarcaVehiculo == 0) {
      putID_Marca = Number(this.arregloDetalleReclamo[0].iD_marca);
    }
    if (this.selectIdMarcaVehiculo != 0) {
      putID_Marca = Number(this.selectIdMarcaVehiculo);
    }

    if (this.dominioCtrl.value == '') {
      putDominio = this.arregloDetalleReclamo[0].dominio;
    }
    if (this.dominioCtrl.value != '') {
      putDominio = this.dominioCtrl.value + '';
    }
    debugger;
    var vehiculo: Vehiculo = {
      IDVehiculo: this.arregloDetalleReclamo[0].iD_Vehiculo,
      dominio: putDominio,
      color: this.arregloDetalleReclamo[0].colorAuto,
      numeroChasis: this.arregloDetalleReclamo[0].numeroChasis,
      numeroMotor: this.arregloDetalleReclamo[0].numeroMotor,
      ID_MarcaVehiculo: putID_Marca,

      ID_Estado: this.arregloDetalleReclamo[0].iD_EstadoVehiculo,
      ID_TipoVehiculo: this.arregloDetalleReclamo[0].iD_Tipovehiculo,
    };

    this.service.putActualizarDetVehicular(vehiculo).subscribe(
      (data) => {
        this.ResetearFormulariosActualizacionReclamo();
        this.metodo_VisualEditarReclamo(this.IDDetalleR);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  regresarHistorial() {
    this.router.navigate([
      'main-nav',
      this.IDUsuario,
      this.IDRol,
      this.IDsesion,
      'historial',
    ]);
  }

  ResetearFormulariosActualizacionReclamo() {
    this.tipoReclamoCtrl.reset();
    this.reclamoAmbientalCtrl.reset();
    this.marcaAutoCtrl.reset();
    this.modeloAutoCtrl.reset();
    this.fechaCtrl.reset();
    this.horaCtrl.reset();
    this.ubicacionCtrl.reset();
    this.descripcionCtrl.reset();
    this.urlFotoCtrl.reset();
    this.alturaCtrl.reset();
    this.dominioCtrl.reset();
    this.estadoReclamoCtrl.reset();
    this.toastr.success('Reclamo Actualizado con exito', '', {
      timeOut: 7000,
      progressBar: true,
    });
  }

  /*  getDatosReclamos(IDDetalle: any) {
    debugger;
    if (IDDetalle == undefined) {
      this.banderaEdicionReclamo == false;
    } else {
      
    }
  } */
}
