import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    ruta:any;
    IDRol:any;
    public IDusuario:any;

  constructor(private breakpointObserver: BreakpointObserver, private _route : ActivatedRoute, private router:Router) {
    
    //console.log(this._route.snapshot.paramMap.get('id'));
    /* aca se captura el id de la url */
    
   /*  this.IDusuario = this._route.snapshot.paramMap.get('id');
   console.log(this.IDusuario); */

   //agarro la url y la separo en base a los / para tener como resultaod un array
    this.ruta = window.location.pathname.split('/');
    this.IDusuario=this.ruta[2]
    console.log('IDusuario: ',this.IDusuario)
    this.IDRol=this.ruta[3];
    console.log('IDRol o Perfil: ',this.IDRol);

    console.clear();
  
  }
  /* de regreso al login */
  goBack() {
    this.router.navigate(['']);
    }

}
