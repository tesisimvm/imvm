import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../../../service/backen-api.service';
import { Reclamo } from '../../../model/reclamo';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoReclamo } from 'src/app/model/tipoReclamo';
import { ReclamoAmbiental } from 'src/app/model/reclamoAmbiental';
import { marca } from 'src/app/model/marca';
import { modelo } from 'src/app/model/modelo';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {

  recla: Reclamo = {
    fecha: '',
    foto: '',
    hora: '',
    IDSesion: 0,
    IDTipoReclamo: 1,
    IDEstado: 1,
    IDDetalleReclamo: 1
  };

  Tiporecla:TipoReclamo[] = new Array<TipoReclamo>();

  ReclamoAmbie:ReclamoAmbiental[] = [];

  Mar:marca[] = [];

  Mod:modelo[] = [];

  constructor( private service: BackenApiService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.getListReclamoAmbiental();
    this.getListMarca();
    this.getListModelo();
   }

  ngOnInit(): void {
    this.getListTipoReclamos();
  }

  listarReclamos(): void{
    this.router.navigate(['Reclamo']
    );
  }

  listarTipoReclamo(): void{
    this.router.navigate(['Reclamo']
    );
  }

  listarReclamoAmbiental(): void{
    this.router.navigate(['Reclamo']
    );
  }

  getListTipoReclamos():void{
    this.service.getTipoReclamo().subscribe(
      res => {
        this.Tiporecla = res;
      },
      err => console.error(err)
    );
  }

  getListReclamoAmbiental():void{
    this.service.getReclamoAmbiental().subscribe(
      res => {
        console.log(res);
        this.ReclamoAmbie = res;
      },
      err => console.error(err)
    );
  }

  getListMarca():void{
    this.service.getMarca().subscribe(
      res => {
        this.Mar = res;
      },
      err => console.error(err)
    );
  }

  getListModelo():void{
    this.service.getModelo().subscribe(
      res => {
        this.Mod = res;
      },
      err => console.error(err)
    );
  }

  createReclamo(): void{
    this.service.postReclamo(this.recla).subscribe(
      res => {
        console.log(res);
        // Limpiar campos
      },
      err => console.error(err)
    );
  }

  ocultarElemento():void{
    
  }

}
