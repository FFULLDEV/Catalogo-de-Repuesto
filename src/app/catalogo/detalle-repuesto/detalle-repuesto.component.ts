import { Component, Input } from '@angular/core';
import { Repuesto } from '../../services/api-repuestos.service';

@Component({
  selector: 'app-detalle-repuesto',
  standalone: false,
  templateUrl: './detalle-repuesto.component.html',
  styleUrl: './detalle-repuesto.component.css',
})
export class DetalleRepuestoComponent {
  @Input() repuestos: Repuesto[] = [];
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
