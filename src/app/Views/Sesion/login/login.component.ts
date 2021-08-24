import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    nombreCtrl = new FormControl('',[Validators.required]);
    usuarioCtrl = new FormControl('',[Validators.required]);
    correoCtrl = new FormControl('',[Validators.required]);
    celularCtrl = new FormControl('',[Validators.required]);
    contraseniaCtrl = new FormControl('',[Validators.required]);
    contrasenia2Ctrl = new FormControl('',[Validators.required]);

    /* [formControl]="userCtrl" */


  /* public formGroup: FormGroup = new FormGroup({
    nombreU: new FormControl(''),
    apellidoU: new FormControl(''),
    correo: new FormControl(''),
    contraseniaU: new FormControl(''),
  }); */
  /* usu: any;
  usuariArray: producto[] = []; */
  constructor(public service: BackenApiService) { }



  ngOnInit(): void {
  }

  /* se establece la llamada Post para crear un usuario - registrar usuario */

  registrarUsuario(){
    //variable que va a tener todos los datos capturados del usuario
    var RegistroU ={
      
    }
  }

}
