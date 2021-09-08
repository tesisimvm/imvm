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
  // idUsuarioMostrar : any;

  constructor(public dPerfil: BackenApiService, private route : ActivatedRoute) {
   
    this.dPerfil.getdatosPerfil(4).subscribe(
      (info) => {
        console.log(info);
       // debugger
        this.datosPerfil = info;
      },
      (error) => {
        console.log(error);
      }
    )
    
  }

  ngOnInit(): void {
   
    // console.log(this.dPerfil.getdatosPerfil(4).subscribe(data => console.log(data)));
    
  }

}
