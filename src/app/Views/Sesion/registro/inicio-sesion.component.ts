import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { inicioSesion } from 'src/app/model/InicioSesion';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  userCtrl = new FormControl('', [Validators.required]);
  passwCtrl = new FormControl('', [Validators.required]);

  public bandera : boolean = false;
  /* Array en donde se van a guardar los datos de validacion del usuario
  mas abajo se encuentra el metodo para realziar la validacion */

  date:Date = new Date();
  fecha:string="";
  hora:string="";
  IDusuario:string="";
  IDRol:string="";
  IDsesion:number=0;



  
  constructor(
    private toastr: ToastrService,
    public service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    /* array para guardar los datos del usuario */
    this.obtenerFechaDeHoy()
  }

  ngOnInit(): void {}

  getEmail(event: Event) {
    event.preventDefault();
    
  }

  Validacion() {
    var usuarioV = {
      email: this.userCtrl.value,
      password: this.passwCtrl.value,
    };
    this.service
      .getValidacionUsuario(usuarioV.email, usuarioV.password)
      .subscribe(
        (data) => {
          if (data[0]) {
           this.bandera = true;
           this.IDusuario = data[0].idUser;/* variables para usarlas en el otro metodo */
           this.IDRol = data[0].idPerfil;
          
            this.postInicioSesionUsuario(data[0].idUser)
           
            
          } else {
            this.bandera = false;
            alert("Usuario y contraseña incorrectos");
          }
        },
        (error) => {
          console.error(error);
          this.bandera = false;
        }
      );
  }

  public postInicioSesionUsuario(idUsua:any){
   
    var ReginicioSesion:inicioSesion ={
      fechaInicio: this.fecha,
      fechaFin:" - ",
      horaInicio:this.hora,
      horaFin:" - ",
      
      ID_Usuario: idUsua,
    }
    
    this.service.postInicioSesionUsuario(ReginicioSesion).subscribe(
      (data) => {
        
        /* desde aca ya se para al menu principal, despues de registrar la sesion */
        this.IDsesion = data.idSesion;
        this.router.navigate(['main-nav', this.IDusuario,this.IDRol,this.IDsesion]); /* this.router.navigate(['main-nav', data[0].idUser]); */
       
    
      },
      (err) => console.error(err),
    );
  
  }

  obtenerFechaDeHoy(){
    this.fecha = String(this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDate());
    this.hora= String(this.date.getHours()+":"+this.date.getMinutes());
    console.log(this.fecha);
    console.log(this.hora);
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
