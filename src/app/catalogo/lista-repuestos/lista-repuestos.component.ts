import { Component, OnInit } from '@angular/core';
import { ApiRepuestosService, Repuesto } from '../../services/api-repuestos.service';

@Component({
  selector: 'app-lista-repuestos',
  standalone: false,
  templateUrl: './lista-repuestos.component.html',
  styleUrl: './lista-repuestos.component.css'
})
export class ListaRepuestosComponent implements OnInit {
  repuestos: Repuesto[] = [];
  filtro = '';
  repuestoSeleccionado = false;

constructor(private api: ApiRepuestosService) {}

  ngOnInit(): void {
    this.api.getRepuestos().subscribe(data => {
      this.repuestos = data.map(r => ({ ...r, selected: false }));
    });
  }

  get repuestosFiltrados(): Repuesto[] {
    return this.repuestos.filter(r =>
      r.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  get repuestosSeleccionados(): Repuesto[] {
  return this.repuestos.filter(r => r.selected);
}

  toggleSeleccion(repuesto: Repuesto) {
    repuesto.selected = !repuesto.selected;
  }

  abrirModal() {
    // Solo abrir modal si hay repuestos seleccionados
    if (this.repuestos.some(r => r.selected)) {
      this.repuestoSeleccionado = true;
    } else {
      alert('No hay repuestos seleccionados');
    }
  }

  cerrarModal() {
    this.repuestoSeleccionado = false;
  }
}
