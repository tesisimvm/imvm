import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datosperfil } from 'src/app/model/perfil';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  datosPerfil: any;
  
  constructor(public dPerfil: BackenApiService) { 
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
