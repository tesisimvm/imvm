import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../../../service/backen-api.service';
import { Reclamo } from '../../../model/reclamo';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { ReclamoAmbiental } from 'src/app/model/reclamoAmbiental';
import { marca } from 'src/app/model/marca';
import { modelo } from 'src/app/model/modelo';
import { FormControl, Validators } from '@angular/forms';
import { DetalleReclamo } from 'src/app/model/detalleReclamo';

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
  ID_Reclamo = new FormControl('', [Validators.required]);
  
  
  recla: Reclamo = {
    fecha: '',
    foto: '',
    hora: '',
    ID_Sesion: 1,
    ID_TipoReclamo: 1,
    ID_Estado: 1,
  };

  Tiporecla: TipoReclamo[] = new Array<TipoReclamo>();

  ReclamoAmbie: ReclamoAmbiental[] = [];

  Mar: marca[] = [];

  Mod: modelo[] = [];

  selectIdTipoReclamo: number = 0; //se establece en 0 para que no se muestren los combobox de los reclamos
  selectIdinfoReclamo:number=0;
  nombreTipoReclamo?: string;
  ruta:any;
  IDUsuario: any;
  IDRol:any;
  IDsesion:any;

  idrecambie:number=0;



  constructor(
    private service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListReclamoAmbiental();
    this.getListMarca();
    this.getListModelo();

    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    this.IDUsuario =this.ruta[2];
    this.IDRol=this.ruta[3]; /* Siempre la posicion 3 es el ROL osea el tipo de usuario */
    console.log(this.IDRol);
    this.IDsesion=this.ruta[4];
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
        debugger
         
        this.ReclamoAmbie = res;
        
      },
      (err) => console.error(err)
    );
  }

  getListMarca(): void {
    this.service.getMarca().subscribe(
      (res) => {
        debugger
        this.Mar = res;
      },
      (err) => console.error(err)
    );
  }

  getListModelo(): void {
    this.service.getModelo().subscribe(
      (res) => {
        debugger
        this.Mod = res;
      },
      (err) => console.error(err)
    );
  }

  registrarReclamo() {
    debugger;

    var RegistroRecl: Reclamo = {
      fecha: this.fechaCtrl.value + '',
      foto: this.urlFotoCtrl.value + '',
      hora: this.horaCtrl.value + '',
      ID_Sesion: Number(this.IDsesion),
      ID_TipoReclamo: Number(
        this.selectIdTipoReclamo
      ) /* lo converti a numero porque lo recibe como string */,
      ID_Estado: 1, /* estado Activo */
    };

    console.log(RegistroRecl);
    this.service.postReclamo(RegistroRecl).subscribe(
      (res) => {
        debugger;
        console.log(res);
        this.registrarDetalleReclamo(res);
      },
      (err) => console.error(err)
    );
  }

  registrarDetalleReclamo(res: any) {
    debugger
    var RegistroDetReclamo: DetalleReclamo = {
      descripcion: this.descripcionCtrl.value + '',
      direccion: this.ubicacionCtrl.value + '',
      altura: 200,
      ID_ReclamoAmbiental: this.selectIdinfoReclamo,
      ID_Vehiculo: 1,
      ID_Reclamo: res.idReclamo,
    };
    console.log(RegistroDetReclamo);
    this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  dataChanged(ev: any) {
    debugger;
    this.selectIdTipoReclamo = ev.target.value;
    
  }
/* metodo especifico para obtener el id del la seleccion de la causa del reclamo 
ambiental */
  obtenerID(ev: any){
    debugger
    this.selectIdinfoReclamo = ev.target.value;
  }

  /*  obtenerNombreTipoReclamo(dato:any){
    debugger
    this.nombreTipoReclamo= dato.target.value;
    console.log(this.nombreTipoReclamo);


  } */
}
