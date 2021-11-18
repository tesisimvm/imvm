import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datosperfil } from 'src/app/model/perfil';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioComponent } from '../usuario/usuario.component';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})



export class PerfilComponent implements OnInit {

  editarUsuario = new FormControl('',[Validators.required]);
  datosPerfil: any;
  ruta:any;

  public IDusuario:any;
  
   ideditar:any;
   editar:boolean=false;
   //usuarioEdit: UsuarioComponent[];
   
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
    
     
      
  }

  ngOnInit(): void {
    // console.log(this.dPerfil.getdatosPerfil(4).subscribe(data => console.log(data)));
  }

  update():void{
    // this.dPerfil.metodoEditar(this.datosPerfil).subscribe(
      
      this.editarUsuario.value;
      console.log(this.editarUsuario.value);

    // );

    // if(this.editar){
    //     this.datosPerfil.metodoEditar(this.dPerfil).subscribe(()=>{
    //     this.NotificacionExito();
    //   }, ()=>{
    //     this.notificacionNoExito();
    //   })
    // }
  }
  NotificacionExito() {
    this.toastr.success(
      '¡Datos de usuario actualizados correctamenta!',
    );
  }
  notificacionNoExito() {
    this.toastr.error(
      '¡Error al intentar actualizar!',
    );
  }
}
