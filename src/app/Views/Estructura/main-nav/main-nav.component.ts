import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

    public IDusuario:any;

  

  constructor(private breakpointObserver: BreakpointObserver, private _route : ActivatedRoute) {
    
    //console.log(this._route.snapshot.paramMap.get('id'));
    /* aca se captura el id de la url que es enviada a trave */
    debugger
     this.IDusuario = this._route.snapshot.paramMap.get('id');
    console.log(this.IDusuario);

  }

}
