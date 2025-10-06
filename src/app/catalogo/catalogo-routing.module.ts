import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRepuestosComponent } from './lista-repuestos/lista-repuestos.component';
import { DetalleRepuestoComponent } from './detalle-repuesto/detalle-repuesto.component';

const routes: Routes = [
  {path: '', component: ListaRepuestosComponent},
  {path: ':id', component: DetalleRepuestoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
