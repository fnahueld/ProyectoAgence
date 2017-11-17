import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Consultor } from '../objetos/consultor.object';
import { Consultoradd } from '../objetos/consultoradd.object';
import { ConsultorService } from '../services/consultor.service';
import { AddDelConsultorService } from '../services/adddelconsultor.service';

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.css']
})
export class ConsultorComponent implements OnInit {

  consultores: Consultor[] = [];
  subscription: Subscription;
  constructor(private consultorService: ConsultorService, private addDelConsultorService: AddDelConsultorService, private consultorEvents: AddDelConsultorService) { }

  sistema:number;
  estado:string;
  tipousuario:string;
  sistema = 1;
  estado = "S";
  tipousuario = "1,2,3";

  ngOnInit() {
    this.getConsultores(this.sistema, this.estado, this.tipousuario);

    this.subscription = this.consultorEvents.delConsultor$.subscribe(
        item => {
            this.consultores.push(item);
        });
  }

  getConsultores(sistema:number, estado:string, tipousuario:string): void {
    this.consultorService.getConsultores(sistema, estado, tipousuario)
    .subscribe(consultores => this.consultores = consultores);
  }

  select(consultor: Consultor): void {
    this.addDelConsultorService.addConsultor(consultor);
    this.consultores = this.consultores.filter(h => h !== consultor);
  }
}
