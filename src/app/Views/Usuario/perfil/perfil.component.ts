import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datosperfil } from 'src/app/model/perfil';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { ActivatedRoute } from '@angular/router';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent implements OnInit {

  datosPerfil: any;
  ruta:any;
  ruta2:any;
  ruta3:any;

  
  //idUsuarioMostrar : datosperfil.IDU;

  constructor(public dPerfil: BackenApiService, private _route : ActivatedRoute) {
    /* aca seesta tratando de dividir la ruta de la url para obtener el id que esta entre
    '/main-nav/ y /perfil/  */
    debugger
    /* /main-nav/2/perfil */
    this.ruta = window.location.pathname;
    this.ruta2 = this.ruta.split('/main-nav/',1);
    console.log(this.ruta2);

    let  ID = this._route.snapshot.paramMap.get('id');
    console.log(ID);

    this.dPerfil.getdatosPerfil(ID).subscribe(
      (info) => {
        console.log(info);
       // debugger
        this.datosPerfil = info;
      },
      (error) => {
        console.log(error);
      }
    )
    
    // var id : any;
    // id = this._route.snapshot.paramMap.get('id');
    // console.log(id);

  }

  ngOnInit(): void {
   
    // console.log(this.dPerfil.getdatosPerfil(4).subscribe(data => console.log(data)));
    
  }

}
