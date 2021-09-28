import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackenApiService } from 'src/app/service/backen-api.service';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
  arraySesion?: string[];



  
  constructor(
    public service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    /* array para guardar los datos del usuario */
    
  }

  ngOnInit(): void {}

  getEmail(event: Event) {
    event.preventDefault();
    console.log(this.userCtrl.value);
    console.log(this.passwCtrl.value);
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
           
            this.router.navigate(['main-nav']); /* this.router.navigate(['main-nav', data[0].idUser]); */
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
}
