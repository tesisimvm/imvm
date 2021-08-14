import { Component, OnInit } from '@angular/core';
import { BackenApiService } from '../service/backen-api.service';
import { Reclamo } from '../model/reclamo';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {

  recla:Reclamo[]=[];

  constructor( private service: BackenApiService) {
    
    this.service.getReclamo().subscribe(data=>
      {console.log(data)
      this.recla =data;

      }, error=>{console.log(error)})

   }

  ngOnInit(): void {
  }

}
