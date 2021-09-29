import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datosperfil } from 'src/app/model/perfil';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { TouchSequence } from 'selenium-webdriver';
=======
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
>>>>>>> javi


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent implements OnInit {

  datosPerfil: any;
  ruta:any;

  public IDusuario:any;
  
  //idUsuarioMostrar : datosperfil.IDU;

  constructor(public dPerfil: BackenApiService, private _route : ActivatedRoute) {
    /* aca seesta tratando de dividir la ruta de la url para obtener el id que esta entre
    '/main-nav/ y /perfil/  */
    debugger
   
    //Obtengo la URL y la separo en base a los / en lo que al final obtengo un array
    this.ruta = window.location.pathname.split('/');
    
    //En base a ese array le digo que voy a usar la
    //celda 2 la cual tiene el id del usuario
    this.dPerfil.getdatosPerfil(this.ruta[2]).subscribe(
      (info) => {
        console.log(info);
        debugger
        this.datosPerfil = info;
        console.log(this.datosPerfil);
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
