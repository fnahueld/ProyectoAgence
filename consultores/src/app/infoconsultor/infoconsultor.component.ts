import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Consultor } from '../objetos/consultor.object';
import { Consultoradd } from '../objetos/consultoradd.object';
import { InfoConsultor } from '../objetos/infoconsultor.object';
import { ConsultorService } from '../services/consultor.service';
import { AddDelConsultorService } from '../services/adddelconsultor.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'infoconsultor',
  templateUrl: './infoconsultor.component.html',
  styleUrls: ['./infoconsultor.component.css']
})

export class InfoConsultorComponent {

  nombreconsultor:string;
  infoconsultores:InfoConsultor[] = [];
  sumaliquido:number;
  sumafijo:number;
  sumacomision:number;
  sumalucro:number;

  constructor() {
  }

  ngOnInit() {
    console.log(this.nombreconsultor);
    console.log(this.infoconsultores);
    for(let index = 0; index<this.infoconsultores.length; index++)
    {
      this.sumaliquido = this.sumaliquido + parseInt(this.infoconsultores[index].LIQUIDO);
      this.sumafijo = this.sumafijo += this.infoconsultores[index].CUSTO_FIXO;
      this.sumacomision = this.sumacomision += this.infoconsultores[index].COMISSAO;
      this.sumalucro = this.sumalucro += this.infoconsultores[index].LUCRO;
    }
  }
  console.log(this.sumaliquido);
}
