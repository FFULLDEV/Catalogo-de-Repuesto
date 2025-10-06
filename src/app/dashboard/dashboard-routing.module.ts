import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { AuthGuard } from '../guards/auth.guard';
import { RepuestosDeshabilitadosComponent } from './repuestos-deshabilitados/repuestos-deshabilitados.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'repuestos', component: RepuestosComponent },
      {
        path: 'repuestos-deshabilitados',
        component: RepuestosDeshabilitadosComponent,
      },
      { path: '', redirectTo: 'repuestos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
