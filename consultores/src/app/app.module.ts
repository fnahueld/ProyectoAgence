import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { ComercialComponent }   from './comercial/comercial.component';
import { AgenciaComponent }   from './agencia/agencia.component';
import { ConsultorComponent }   from './consultor/consultor.component';
import { ConsultoraddComponent }   from './consultoradd/consultoradd.component';
import { ContentComponent }   from './content/content.component';
import { ConsultorService }   from './services/consultor.service';
import { AddDelConsultorService }    from './services/adddelconsultor.service';
import { InfoConsultorComponent } from './infoconsultor/infoconsultor.component';
import { GraficoComponent } from './grafico/grafico.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    MaterializeModule.forRoot()
  ],

  declarations: [
    AppComponent,
    AgenciaComponent,
    ComercialComponent,
    ConsultorComponent,
    ConsultoraddComponent,
    ContentComponent,
    InfoConsultorComponent,
    GraficoComponent
  ],

  providers: [ ConsultorService, AddDelConsultorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
