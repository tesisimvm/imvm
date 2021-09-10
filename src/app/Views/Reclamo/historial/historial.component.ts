import { Component, OnInit } from '@angular/core';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  Dreclamos:any;

  constructor(public detalleReclamo:BackenApiService) { 
    this.detalleReclamo.getDetalleReclamo().subscribe(
      (info) => {
        console.log(info);
       // debugger
        this.Dreclamos = info;
        console.log(this.Dreclamos)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
