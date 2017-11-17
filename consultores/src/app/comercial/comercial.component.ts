import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory,
         NgModule, Type, Compiler } from '@angular/core';
import { MaterializeModule  } from 'angular2-materialize';
import {Observable} from 'rxjs/Rx';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Subscription }   from 'rxjs/Subscription';
import { ConsultorService } from '../services/consultor.service';
import { InfoConsultor } from '../objetos/infoconsultor.object';
import { ConsultoraddComponent } from '../consultoradd/consultoradd.component';
import { InfoConsultorComponent } from '../infoconsultor/infoconsultor.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { AppModule } from 'app/app.module';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})

export class ComercialComponent implements OnInit {
  infoconsultores: InfoConsultor[] = [];
  graficoNombres:string[] = [];
  graficoNumeros:number[] = [];
  call: Observable<any>;

  @ViewChild(ConsultoraddComponent) viewConsultorAdd: ConsultoraddComponent;

  //Accedo al componente de contenido dinamico para consultores
  @ViewChild('container', {read: ViewContainerRef}) viewContainer: ViewContainerRef;

  //Accedo al componente de contenido dinamico para grafico
  @ViewChild('container1', {read: ViewContainerRef}) viewContainer1: ViewContainerRef;

  constructor(private consultorService: ConsultorService, private compiler: Compiler ) { }

  getInfoConsultores(fechainicio:string, fechafin:string): void {
    //Pintar en componente content, dinamicamente, componentes info consultores
      this.viewContainer.clear();

      for(let index = 0; index<this.viewConsultorAdd.consultoresadd.length; index++)
      {

        let nombreconsultor = this.viewConsultorAdd.consultoresadd[index].no_usuario;
        Observable.forkJoin(this.consultorService.getinfoConsultores(this.viewConsultorAdd.consultoresadd[index].co_usuario, fechainicio, fechafin)
        .subscribe(infoconsultores => this.infoconsultores = infoconsultores));

        this.createComponentFactory(InfoConsultorComponent)
          .then((factory: ComponentFactory<InfoConsultorComponent>) =>
            this.addItem(factory, nombreconsultor, this.infoconsultores, index),
             //this.viewContainer.createComponent(factory, index).instance,
            (err: any) => console.error(err)
          );
      }
  }

  crateGraficoTorta(fechainicio:string, fechafin:string): void{
    this.viewContainer1.clear();
    //this.infoconsultores = [];
    this.graficoNombres = [];
    this.graficoNumeros = [];
    for(let index = 0; index<this.viewConsultorAdd.consultoresadd.length; index++)
    {
      let nombreconsultor = this.viewConsultorAdd.consultoresadd[index].no_usuario;
      this.consultorService.getinfoConsultoresGrafico(this.viewConsultorAdd.consultoresadd[index].co_usuario, fechainicio, fechafin)
      .subscribe(infoconsultores => this.infoconsultores = infoconsultores);

      this.graficoNombres.push(nombreconsultor);
      this.graficoNumeros.push(this.infoconsultores[0].LIQUIDO);
    }

    this.createComponentGraficoFactory(GraficoComponent)
      .then((factory: ComponentFactory<GraficoComponent>) =>
        //this.viewContainer1.createComponent(factory),
        this.addItemGrafico(factory, this.graficoNombres, this.graficoNumeros),
        (err: any) => console.error(err)
    );
  }


  addItem (factory:ComponentFactory, nombre:string, infoconsultores:InfoConsultor[], index:integer) {
    let instance  = this.viewContainer.createComponent(factory, index).instance;
    instance.nombreconsultor = nombre;
    instance.infoconsultores = infoconsultores;
  }

  addItemGrafico (factory:ComponentFactory) {
    let instance  = this.viewContainer1.createComponent(factory, 0).instance;
    console.log(this.graficoNombres);
    console.log(this.graficoNumeros);

    instance.pieChartLabels = this.graficoNombres;
    instance.pieChartData =  this.graficoNumeros;
  }

  private createComponentFactory(componentType: Type<InfoConsultorComponent>): Promise<ComponentFactory<InfoConsultorComponent>> {
  		//let runtimeModule = this.createDynamicModule(componentType);
      let appModule = AppModule;

      //componentType = new InfoConsultorComponent();

  		// compile module
  		return this.compiler
  			.compileModuleAndAllComponentsAsync(appModule)
  			// All factories available in this module are returned instead of just the one we are interested in.
  			// We filter the array to just get the factory for this componentType.
  			.then(moduleWithFactories =>
  				moduleWithFactories.componentFactories.find(fact => fact.componentType === componentType));
  }

  private createComponentGraficoFactory(componentType: Type<GraficoComponent>): Promise<ComponentFactory<GraficoComponent>> {

      let appModule = AppModule;
  		// compile module
  		return this.compiler
  			.compileModuleAndAllComponentsAsync(appModule)
  			// All factories available in this module are returned instead of just the one we are interested in.
  			// We filter the array to just get the factory for this componentType.
  			.then(moduleWithFactories =>
  				moduleWithFactories.componentFactories.find(fact => fact.componentType === componentType));
  }


}
