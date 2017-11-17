import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { AddDelConsultorService } from '../services/adddelconsultor.service';
import { Consultoradd } from '../objetos/consultoradd.object';

@Component({
  selector: 'app-cosultoradd',
  templateUrl: './consultoradd.component.html',
  styleUrls: ['./consultoradd.component.css']
})

export class ConsultoraddComponent implements OnInit {
  subscription: Subscription;
  consultoresadd: Consultoradd[] = [];
  constructor(private addDelConsultorService: AddDelConsultorService, private consultorEvents: AddDelConsultorService) { }

  ngOnInit() {
       this.subscription = this.consultorEvents.addConsultor$.subscribe(
           item => {
               this.consultoresadd.push(item);
           });
   }

   delete(consultoradd: Consultoradd): void {
     this.addDelConsultorService.delConsultor(consultoradd);
     this.consultoresadd = this.consultoresadd.filter(h => h !== consultoradd);
   }
}
