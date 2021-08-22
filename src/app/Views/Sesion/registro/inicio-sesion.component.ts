import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  userCtrl = new FormControl('', [Validators.required]);
  passwCtrl = new FormControl('', [Validators.required]);

  /* public formGroup: FormGroup = new FormGroup({
    nomUsuario: new FormControl('',[Validators.required]),
    passUsuario: new FormControl('',[Validators.required]),
  }); */

  constructor(public service: BackenApiService) {
    
  }

  ngOnInit(): void {}

  getEmail(event: Event){
    event.preventDefault();
    console.log(this.userCtrl.value);
    console.log(this.passwCtrl.value);
  }

 /*  getEmailFG(event: Event){
    event.preventDefault();
    console.log(this.userCtrl.value);
    console.log(this.passwCtrl.value);
  } */

  Validacion() {
    var usuarioV = {
      usuario: this.userCtrl.value,
      passW: this.passwCtrl.value,
    };
    this.service.getValidacionUsuario(usuarioV).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
