import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datosperfil } from 'src/app/model/perfil';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent implements OnInit {

  datosPerfil: any;
  ruta:any;

  public IDusuario:any;
  
  ideditar:any;
  editar:boolean=false;
  
  //idUsuarioMostrar : datosperfil.IDU;

  constructor(public dPerfil: BackenApiService, private _route : ActivatedRoute,private toastr: ToastrService, public modal:NgbModal) {
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
    
    // this.ideditar=this.ruta[2];
    // if(this.ideditar){
    //   this.editar = true;
    //   this.datosPerfil.get().subscribe((data:datosperfil[])=>{
    //     this.ediPerfil=data;
    //     this.ediPerfil=this.datosPerfil.find((x)=>{return x.IDUsuario==this.ideditar});
    //   },(error)=>{
    //     console.log(error);
    //   });
    // }
    // else{
    //   this.editar=false;
    // }
    // var id : any;
    // id = this._route.snapshot.paramMap.get('id');
    // console.log(id);
  }

  ngOnInit(): void {
    // console.log(this.dPerfil.getdatosPerfil(4).subscribe(data => console.log(data)));
  }

  guardarEdicion(){
    if(this.editar){
        this.datosPerfil.metodoEditar(this.dPerfil).subscribe(()=>{
        this.NotificacionExito();
      }, ()=>{
        this.notificacionNoExito();
      })
    }
  }
  NotificacionExito() {
    this.toastr.success(
      '¡Datos de usuario actualizados correctamenta!',
    );
  }
  notificacionNoExito() {
    this.toastr.success(
      '¡Error al intertar actualizar!',
    );
  }
}
