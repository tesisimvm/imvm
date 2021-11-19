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

  public FER: EstadoReclamo[] = []; /* filtro estadoRecmo.ts */

  selectIDTipReclamo = 0; /* Variable para capturar el valor del tipo de reclamo */
  selectIDEstadoReclamo = 0; /* Variable para capturar el id del estado del tipo de reclamo */
  @Input() dataEntrante: any;
  objetoReclamo: any;

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

    this.getTipoReclamo();
    this.getDetalleReclamos();
  }

  ngOnInit(): void {}

  getDetalleReclamos() {
    debugger;
    if (this.IDRol == 1 || this.IDRol == 2) {
      this.detalleReclamo.getTodoslosDetalleReclamo().subscribe(
        (info) => {
          console.log(info);

          this.Dreclamos = info;
          console.log(
            'detalles de reclamos siendo admin o empleado: ',
            this.Dreclamos
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.detalleReclamo.getDetalleReclamoUsuario(this.IDUsuario, 1).subscribe(
        (info) => {
          console.log(info);

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
    debugger;
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
    debugger;
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
    var filtroIDTReclamo: any;
    var filtroIDEstadoReclamo: any;
    debugger
    if (this.IDRol == 1 || this.IDRol == 2) {
      debugger;
      if (this.tipoReclamoCtrl.value != null) {
        filtroIDTReclamo = this.selectIDTipReclamo;
        filtroIDEstadoReclamo = this.selectIDEstadoReclamo;
      }
      this.detalleReclamo
        .getDetalleReclamoFiltrado(filtroIDTReclamo, filtroIDEstadoReclamo)
        .subscribe(
          (res) => {
            this.formTarjetas.reset();
            delete this.Dreclamos;
            debugger;
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
    }else{
      /* Filtro por usuario */
      if (this.tipoReclamoCtrl.value != null) {
        filtroIDTReclamo = this.selectIDTipReclamo;
        filtroIDEstadoReclamo = this.selectIDEstadoReclamo;
      }
      this.detalleReclamo.getDetalleReclamoFiltradoUsuario(filtroIDTReclamo, filtroIDEstadoReclamo,this.IDUsuario)
        .subscribe(
          (res) => {
            this.formTarjetas.reset();
            delete this.Dreclamos;
            debugger;
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



    }
  }
}
