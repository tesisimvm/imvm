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

  constructor(
    private service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListReclamoAmbiental();
    this.getListMarca();
    this.getListModelo();
  }

  ngOnInit(): void {
   this.getListTipoReclamos();
  }

  getListTipoReclamos(): void {
   this.service.getTipoReclamo().subscribe(
     (res) => {
       /* this.Tiporecla = res; */
     },
     (err) => console.error(err)
   );
 }

 getListReclamoAmbiental(): void {
   this.service.getReclamoAmbiental().subscribe(
     (res) => {
       console.log(res);
       /* this.ReclamoAmbie = res; */
     },
     (err) => console.error(err)
   );
 }

 getListMarca(): void {
   this.service.getMarca().subscribe(
     (res) => {
       /* this.Mar = res; */
     },
     (err) => console.error(err)
   );
 }

 getListModelo(): void {
   this.service.getModelo().subscribe(
     (res) => {
       /* this.Mod = res; */
     },
     (err) => console.error(err)
   );
 }

 registrarReclamo() {
   debugger;

   var RegistroRecl = {
     fecha: this.fechaCtrl.value + '',
     foto: this.urlFotoCtrl.value + '',
     hora: this.horaCtrl.value + '',
     IDSesion: 1,
     IDTipoReclamo: this.tipoReclamoCtrl.value,
     IDEstado: 1,
   };
   console.log(RegistroRecl);
   this.service.postReclamo(RegistroRecl).subscribe(
     (res) => {
       console.log(res);
       this.registrarDetalleReclamo(res);
     },
     (err) => console.error(err)
   );
 }

 registrarDetalleReclamo(variable:any) {
   debugger
   console.log(variable[0]);
   
    var RegistroDetReclamo = {
     descripcion: this.descripcionCtrl.value + '',
     direccion: this.descripcionCtrl.value + '',
     altura: '200',
     IDReclamoAmbiental: 1,
     IDVehiculo: 1,
     ID_Reclamo: variable[0]
   };
   console.log(RegistroDetReclamo);
   debugger;
   this.service.postDetalleReclamo(RegistroDetReclamo).subscribe(
     (res) => {
       console.log(res);
     },
     (err) => console.error(err)
   );
 }
}
