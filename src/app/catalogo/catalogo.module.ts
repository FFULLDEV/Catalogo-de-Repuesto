import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ListaRepuestosComponent } from './lista-repuestos/lista-repuestos.component';
import { DetalleRepuestoComponent } from './detalle-repuesto/detalle-repuesto.component';


@NgModule({
  declarations: [
    ListaRepuestosComponent,
    DetalleRepuestoComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ListaRepuestosComponent,
    DetalleRepuestoComponent
  ]
})
export class CatalogoModule { }
