import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComercialComponent }   from './comercial/comercial.component';
import { AgenciaComponent }   from './agencia/agencia.component';

const routes: Routes = [
  { path: '', redirectTo: 'agencia', pathMatch: 'full' },
  { path: 'agencia', component: AgenciaComponent },
  { path: 'comercial', component: ComercialComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
