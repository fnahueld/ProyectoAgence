import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Consultor } from '../objetos/consultor.object';
import { InfoConsultor } from '../objetos/infoconsultor.object';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConsultorService {

  private consultorUrl = "http://localhost:8011/api/consultor";
  private infoconsultorUrl = "http://localhost:8011/api/getinfoconsultor";
  private infoconsultorgraficoUrl = "http://localhost:8011/api/getinfoconsultorgrafico";
  constructor(private http: HttpClient){ }

  /** GET Consultor from the server */
  getConsultores(sistema:number, estado:string, tipousuario:string): Observable<Consultor[]> {
    const url = `${this.consultorUrl}/${sistema}/${estado}/${tipousuario}`;
    return this.http.get<Consultor[]>(url)
      .pipe(
        tap(consultor => this.log(`fetched consultores`)),
        catchError(this.handleError('getConsultores', []))
      );
  }

  getinfoConsultores(consultor:string, fechainicio:string, fechafin:string): Observable<InfoConsultor[]> {
    const url = `${this.infoconsultorUrl}/${consultor}/${fechainicio}/${fechafin}`;
    return this.http.get<InfoConsultor[]>(url)
      .pipe(
        tap(infoconsultor => this.log(`fetched infoconsultores`)),
        catchError(this.handleError('getinfoConsultores', []))
      );
  }

  getinfoConsultoresGrafico(consultor:string, fechainicio:string, fechafin:string): Observable<InfoConsultor[]> {
    const url = `${this.infoconsultorgraficoUrl}/${consultor}/${fechainicio}/${fechafin}`;
    return this.http.get<InfoConsultor[]>(url)
      .pipe(
        tap(infoconsultor => this.log(`fetched infoconsultores`)),
        catchError(this.handleError('getinfoConsultores', []))
      );
  }


 private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }

 /** Log a HeroService message with the MessageService */
 private log(message: string) {
   console.log('ConsultorService: ' + message);
 }
}
