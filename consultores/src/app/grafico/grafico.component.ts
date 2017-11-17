import { Component } from '@angular/core';

@Component({
  selector: 'grafico',
  templateUrl: 'grafico.component.html'
})
export class GraficoComponent {
  // Pie
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
