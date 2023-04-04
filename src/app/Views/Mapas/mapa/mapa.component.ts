import { Component, OnInit } from '@angular/core';
import { GeolocalizacionService } from 'src/app/service/geolocalizacion/geolocalizacion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(private localizacion: GeolocalizacionService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  latitud: string='';
  longitud : string='';

  getLocation() {
    this.localizacion.getPosition().then(pos => {
        this.latitud = pos.lat;
        this.longitud = pos.lng;
    });
}

}
