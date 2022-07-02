import { Component, OnInit } from '@angular/core';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  /*  providers: [NgbModalConfig, NgbModal], */
})
export class ConfiguracionComponent implements OnInit {
  nombreEstadoCtrl = new FormControl('', [Validators.required]);
  nombreTipoEstadoCtrl = new FormControl('', [Validators.required]);
  listaTipoEstadoCtrl = new FormControl('', [Validators.required]);
  nombreTipoReclamoCtrl = new FormControl('', [Validators.required]);

  nombreTipoVehiculoCtrl = new FormControl('', [Validators.required]);
  dominioCtrl = new FormControl('', [Validators.required]);
  marcaCtrl = new FormControl('', [Validators.required]);
  modeloCtrl = new FormControl('', [Validators.required]);
  colorCtrl = new FormControl('', [Validators.required]);
  numChasisCtrl = new FormControl('', [Validators.required]);
  numMotorCtrl = new FormControl('', [Validators.required]);
  listaEstadoVehiculoCtrl = new FormControl('', [Validators.required]);

  nombreModalMarcaCrtl = new FormControl('', [Validators.required]);
  nombreModalModelo = new FormControl('', [Validators.required]);

  nombreModalPerfil = new FormControl('', [Validators.required]);

  objTipoEstado: any; /* Select */
  objEstadosDelTipo: any; /* Tabla */
  selectIDTipEstado = 0; /* Variable para capturar el valor del tipo de estado */

  objModalTipoEstado: any;
  selectIDTipEstadoModal = 0;

  objTipVehiculo: any; /* Select */
  selectIDTipVehiculo = 0; /* Tabla */
  objListaVehiculos: any;

  objTipoDeReclamo: any; /* Select */
  selectIDTipReclamo = 0; /* Variable para capturar el valor del tipo de reclamo */
  objListaTipoReclamo: any;

  objTipoPerfil: any; /* Select */
  selectIDTipPerfil = 0; /* Variable para capturar el valor del tipo de reclamo */
  objListaTipoPerfil: any;

  banderaTextEstado: boolean = false;
  banderaSelectEstado: boolean = false;

  ruta: any;
  IDUsuario: any;
  IDRol: any;
  IDSesion: any;

  constructor(
    config: NgbModalConfig,
    private servicio: BackenApiService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {
    /* Configuracion del Modal */
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;

    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario = this.ruta[2];
    this.IDRol =
      this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    this.IDSesion = this.ruta[4];
    this.getTipoEstado();
    this.getTipoReclamo();
    this.getTipoVehiculo();
    this.getTipoPerfil();
  }

  ngOnInit(): void {}

  /* Visualizar el modal nuevo estado */
  visualizarModal(content: any) {
    this.modal.open(content);
  }
  visualizarModalTiposReclamos(content: any) {
    this.modal.open(content);
  }
  visualizarModalTiposVehiculos(content: any) {
    this.modal.open(content);
  }
  visualizarModalVehiculos(content: any) {
    this.modal.open(content);
  }
  visualizarModalMarca(content: any) {
    this.modal.open(content);
  }
  visualizarModalModelo(content: any) {
    this.modal.open(content);
  }
  visualizarModalPerfil(content: any) {
    this.modal.open(content);
  }

  /* metodo para visualizar input del modal nuevo estado */
  visualizarInput() {
    debugger;
    if (this.banderaTextEstado == false) {
      /* Se visualiza el texto*/
      this.banderaTextEstado = true;
      /* Se oculta el Select */
      this.banderaSelectEstado = true;
      this.selectIDTipEstadoModal = 0;
    }
  }

  botonCerrarNuevoEstado() {
    this.limpiarModalEstado();
  }
  botonCerrarTipoReclamo() {
    this.modal.dismissAll();
  }
  botonCerrarNuevoTipoVehiculo() {
    this.modal.dismissAll();
  }
  botonCerrarVehiculo() {
    this.modal.dismissAll();
  }
  botonCerrarMarca() {
    this.modal.dismissAll();
  }
  botonCerrarModelo() {
    this.modal.dismissAll();
  }
  botonCerrarModalPerfil(){
    this.modal.dismissAll();
  }

  botonCrearNuevoEstado() {
    debugger;
    /* cuando quiero crear un estado para un tipo de estado ya existente */
    if (
      this.nombreEstadoCtrl.value != '' &&
      this.selectIDTipEstadoModal != 0 &&
      this.banderaSelectEstado == false
    ) {
      this.NotificacionEstadoCreado();

      this.limpiarModalEstado();
    } else if (
      this.nombreEstadoCtrl.value != '' &&
      this.selectIDTipEstadoModal == 0 &&
      this.banderaSelectEstado == true &&
      this.nombreTipoEstadoCtrl.value != ''
    ) {
      this.NotificacionTipoEstadoCreado();
      /* Restablecimiento de variables */
      this.limpiarModalEstado();
    } else {
      this.NotificacionRellenarCampos();
    }
  }
  botonCrearNuevoTipoReclamo() {
    if (this.nombreTipoReclamoCtrl.value != 0) {
      this.nombreTipoReclamoCtrl.setValue('');
      this.modal.dismissAll();
      this.NotificacionTipoEstadoCreado();
    } else {
      this.NotificacionRellenarCampos();
    }
  }

  obtenerIDTipoEstadoModal(ev: any) {
    this.selectIDTipEstadoModal = 0;
    this.selectIDTipEstadoModal = ev.target.value;
  }

  /* Modal Vehiculo */
  botonCrearVehiculo() {
    if (
      this.nombreTipoVehiculoCtrl.value != '' &&
      this.dominioCtrl.value != '' &&
      this.marcaCtrl.value != '' &&
      this.modeloCtrl.value != '' &&
      this.colorCtrl.value != '' &&
      this.numChasisCtrl.value != '' &&
      this.numMotorCtrl.value &&
      this.listaEstadoVehiculoCtrl.value != ''
    ) {
    } else {
      
      this.NotificacionRellenarCampos();
    }
  }

  limpiarModalEstado() {
    /* cuando se cierra el modal o se crea el estado o el tipo de estado */
    this.banderaTextEstado = false;
    this.banderaSelectEstado = false;
    this.selectIDTipEstadoModal = 0;
    this.nombreEstadoCtrl.setValue('');
    this.nombreTipoEstadoCtrl.setValue('');
    this.modal.dismissAll();
  }
  limpiarModalVehiculos() {
    this.nombreTipoVehiculoCtrl.setValue('');
    this.dominioCtrl.setValue('');
    this.marcaCtrl.setValue('');
    this.modeloCtrl.setValue('');
    this.colorCtrl.setValue('');
    this.numChasisCtrl.setValue('');
    this.numMotorCtrl.setValue('');
    this.listaEstadoVehiculoCtrl.setValue('');
  }
  getTipoEstado(): void {
    this.servicio.getTipoEstadoAdmin(this.IDRol).subscribe(
      (res) => {
        this.objTipoEstado = res;
        this.objModalTipoEstado = res;
      },
      (error) => console.error(error)
    );
  }

  obtenerIDTipoEstado(ev: any) {
    this.selectIDTipEstado = 0;
    this.selectIDTipEstado = ev.target.value;
    this.servicio.getEstadosDelTipo(this.selectIDTipEstado).subscribe(
      (res) => {
        this.objEstadosDelTipo = res;
      },
      (error) => console.error(error)
    );
  }

  getTipoVehiculo() {
    /* Relleno del select tipo vehiculo */
    this.servicio.getTipVehiculo().subscribe(
      (res) => {
        this.objTipVehiculo = res;
      },
      (error) => console.error(error)
    );
  }

  obtenerIDTipoVehiculo(dato: any) {
    this.selectIDTipVehiculo = 0;
    /* selecciono un tipo y muestro la lista de esos tipos de vehiculos */
    this.selectIDTipVehiculo = dato.target.value;
    this.servicio.getListaTiposVehiculos(this.selectIDTipVehiculo).subscribe(
      (res) => {
        this.objListaVehiculos = res;
      },
      (error) => console.error(error)
    );
  }

  getTipoReclamo(): void {
    this.servicio.getTipoReclamo().subscribe(
      (res) => {
        this.objTipoDeReclamo = res;
      },
      (err) => console.error(err)
    );
  }

  obtenerIDTipoReclamo(ev: any) {
    this.selectIDTipReclamo = 0;

    this.selectIDTipReclamo = ev.target.value;
    console.log(this.selectIDTipReclamo);
    this.servicio.getListaTiposReclamos(this.selectIDTipReclamo).subscribe(
      (res) => {
        this.objListaTipoReclamo = res;
      },
      (err) => console.error(err)
    );
  }

  getTipoPerfil(): void {
    this.servicio.getTipoPerfil().subscribe(
      (res) => {
        this.objTipoPerfil = res;
      },
      (err) => console.error(err)
    );
  }

  obtenerIDTipoPerfil(ev: any) {
    this.selectIDTipPerfil = 0;
    this.selectIDTipReclamo = ev.target.value;
  }

  NotificacionRellenarCampos() {
    this.toastr.warning(
      'Complete el formulario para realizar la operación!',
      'Atención',
      {
        timeOut: 2000,
        positionClass: 'toast-bottom-center',
      }
    );
  }
  NotificacionEstadoCreado() {
    this.toastr.success('Estado creado!', 'Atención', {
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    });
  }
  NotificacionTipoEstadoCreado() {
    this.toastr.success(
      'El tipo de estado con nuevo estado creado!',
      'Atención',
      {
        timeOut: 2000,
        positionClass: 'toast-bottom-center',
      }
    );
  }
  NotificacionTipoReclamoCreado() {
    this.toastr.success('El tipo de Reclamo a sido creado!', 'Atención', {
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
    });
  }
}
