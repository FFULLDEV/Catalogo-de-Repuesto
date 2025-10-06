import { Component, OnInit } from '@angular/core';
import {
  ApiRepuestosService,
  Repuesto,
} from '../../services/api-repuestos.service';

@Component({
  selector: 'app-lista-repuestos',
  templateUrl: './lista-repuestos.component.html',
  styleUrl: './lista-repuestos.component.css',
  standalone: false,
})
export class ListaRepuestosComponent implements OnInit {
  repuestos: Repuesto[] = [];
  filtro = '';
  repuestoSeleccionado = false;

  constructor(private api: ApiRepuestosService) {}

  ngOnInit(): void {
    this.api.getRepuestos().subscribe((data) => {
      this.repuestos = data.map((r) => ({ ...r, selected: false }));
    });
  }

  get repuestosFiltrados(): Repuesto[] {
    return this.repuestos.filter((r) =>
      r.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  get repuestosSeleccionados(): Repuesto[] {
    return this.repuestos
      .filter((r) => r.selected)
      .map((r) => ({
        ...r,
        imagen: r.imagen.startsWith('http')
          ? r.imagen
          : `http://localhost:3000${r.imagen}`,
      }));
  }

  toggleSeleccion(repuesto: Repuesto) {
    repuesto.selected = !repuesto.selected;
  }

  abrirModal() {
    // Solo abrir modal si hay repuestos seleccionados
    if (this.repuestos.some((r) => r.selected)) {
      this.repuestoSeleccionado = true;
    } else {
      alert('No hay repuestos seleccionados');
    }
  }

  cerrarModal() {
    this.repuestoSeleccionado = false;
  }

  numeroWhatsapp = '+51922244701';

  abrirWhatsApp() {
    if (this.repuestos.length === 0) return;
    const nombres = this.repuestos.map((r) => r.nombre).join(', ');
    const marcas = this.repuestos.map((r) => r.marca).join(', ');
    const mensaje = `Hola, estoy interesado en los siguientes repuestos: ${nombres}, marcas: ${marcas}. ¿Podrían proporcionarme más información?`;
    window.open(
      `https://wa.me/${this.numeroWhatsapp}?text=${encodeURIComponent(
        mensaje
      )}`,
      '_blank'
    );
  }
}
