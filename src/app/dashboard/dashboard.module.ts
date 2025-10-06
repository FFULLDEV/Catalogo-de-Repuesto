import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { RepuestosDeshabilitadosComponent } from './repuestos-deshabilitados/repuestos-deshabilitados.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    RepuestosComponent,
    RepuestosDeshabilitadosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    DashboardRoutingModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
