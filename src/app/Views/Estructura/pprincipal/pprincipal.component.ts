import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tipoDeReclamo } from 'src/app/model/Dashboard/tiposReclamo';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackenApiService } from 'src/app/service/backen-api.service';

@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.component.html',
  styleUrls: ['./pprincipal.component.css']
})
export class PprincipalComponent implements OnInit {

  data:tipoDeReclamo[]=[];

  view: [number, number] = [400, 400];
  view2: [number, number] = [500, 423];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#F2A873', '#6F9BDC', '#C7B42C', '#AAAAAA']
  };

  constructor( 
    private toastr: ToastrService,
    private service: BackenApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  // get data(){
  //    return this.service.getReclamo;
  // }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    // this.data=tipoDeReclamo[];
  }

}
