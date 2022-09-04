import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  nombreCtrl = new FormControl('', [Validators.required]);
  usuarioCtrl = new FormControl('', [Validators.required]);
  correoCtrl = new FormControl('', [Validators.required]);
  celularCtrl = new FormControl('', [Validators.required]);
  contraseniaCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  contrasenia2Ctrl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  banderaAlerta: boolean = true;
  banderaContrasenia: boolean = false;

  constructor(public service: BackenApiService) {}

  ngOnInit(): void {}

  validarEmail() {
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        this.correoCtrl.value
      )
    ) {
      this.banderaAlerta = true; /* si el correo es correcto */
    } else {
      this.banderaAlerta = false; /* si el correo no es correcto */
    }
  }
  validarContrasenias() {
    var contra1;
    var contra2;
    contra1=this.contraseniaCtrl.value+'';
    contra2=this.contrasenia2Ctrl.value+'';
    
    if (contra2===contra1) {
      debugger
      this.banderaContrasenia = true; /* si las contraseñas son iguales */
      console.log('contrasenia iguales');
    } else if (this.contrasenia2Ctrl.value != this.contraseniaCtrl.value) {
      this.banderaContrasenia = false; /* si las contraseñas no son iguales */
      console.log('contrasenia no son iguales');
    }
  }

  /* se establece la llamada Post para crear un usuario - registrar usuario */

  registrarUsuario() {
   
    //variable que va a tener todos los datos capturados del usuario
    var RegistroU = {
      Nombre: this.nombreCtrl.value + '',
      Nick: this.usuarioCtrl.value + '',
      Correo: this.correoCtrl.value + '',
      Celular: this.celularCtrl.value + '',
      Contrasenia: this.contraseniaCtrl.value + '',
      DNI: '-',
      Apellido: '-',
      ID_Perfil: 3,
      ID_Estado: 10,
    };
    console.log(RegistroU);
    debugger;
    this.service.postUsuario(RegistroU).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
