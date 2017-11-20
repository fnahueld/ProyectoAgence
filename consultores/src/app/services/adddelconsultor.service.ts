import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Consultor } from '../objetos/consultor.object';

@Injectable()
export class AddDelConsultorService {

    private addConsultorToTargetConsultor = new Subject<Consultor>();
    addConsultor$ = this.addConsultorToTargetConsultor.asObservable();

    addConsultor(item: any) {
        this.addConsultorToTargetConsultor.next(item);
    }

    private delConsultorToTargetConsultor = new Subject<Consultor>();
    delConsultor$ = this.delConsultorToTargetConsultor.asObservable();

    delConsultor(item: any) {
        this.delConsultorToTargetConsultor.next(item);
    }
}
