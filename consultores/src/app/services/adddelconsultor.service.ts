import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AddDelConsultorService {

    private addConsultorToTargetConsultor = new Subject<string>();
    addConsultor$ = this.addConsultorToTargetConsultor.asObservable();

    addConsultor(item: any) {
        this.addConsultorToTargetConsultor.next(item);
    }

    private delConsultorToTargetConsultor = new Subject<string>();
    delConsultor$ = this.delConsultorToTargetConsultor.asObservable();

    delConsultor(item: any) {
        this.delConsultorToTargetConsultor.next(item);
    }
}
