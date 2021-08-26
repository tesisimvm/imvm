import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../../../service/backen-api.service';
import { Reclamo } from '../../../model/reclamo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {

  recla: Reclamo = {
    fecha: '',
    foto: '',
    hora: '',
    IDSesion: 0,
    IDTipoReclamo: 1,
    IDEstado: 1,
    IDDetalleReclamo: 1
  };

  constructor( private service: BackenApiService, private router: Router, private activatedRoute: ActivatedRoute) {
    
    // this.service.getReclamo().subscribe(data=>
    //   {console.log(data)
    //   this.recla =data;

    //   }, error=>{console.log(error)})

   }

  ngOnInit(): void {
  }

  listarReclamos(): void{
    this.router.navigate(['Reclamo']
    );
  }

  listarTipoReclamo(): void{
    this.router.navigate(['Reclamo']
    );
  }

  listarReclamoAmbiental(): void{
    this.router.navigate(['Reclamo']
    );
  }

  // listarReclamoAmbiental(): void{
  //   this.router.navigate(['Reclamo']
  //   );
  // }


  createReclamo(): void{
    this.service.postReclamo(this.recla).subscribe(
      res => {
        console.log(res);
        // Limpiar campos
      },
      err => console.error(err)
    );
  }

}
