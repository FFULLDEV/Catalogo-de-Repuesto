import { Component, OnInit } from '@angular/core';
import { ApiRepuestosService } from '../../services/api-repuestos.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-repuestos-deshabilitados',
  templateUrl: './repuestos-deshabilitados.component.html',
  styleUrls: ['./repuestos-deshabilitados.component.css'],
  standalone: false,
})
export class RepuestosDeshabilitadosComponent implements OnInit {
  repuestosInactivos: any[] = [];
  showAlert = false;
  alertMessage = '';
  loadingId: number | null = null;

  constructor(
    private repuestosService: ApiRepuestosService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarRepuestosInactivos();
  }

  cargarRepuestosInactivos(): void {
    this.repuestosService.getDeshabilitados().subscribe({
      next: (data) => {
        this.repuestosInactivos = data.filter((r: any) => !r.activo);
      },
      error: () => {
        this.alertMessage = 'Error al cargar los repuestos inactivos';
        this.showAlert = true;
      },
    });
  }

  toggleRepuesto(id: number) {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }

    this.loadingId = id;

    this.repuestosService.toggleRepuesto(id).subscribe({
      next: (res: any) => {
        this.mostrarAlerta(res.mensaje || 'Estado actualizado');
        this.cargarRepuestos();
        this.loadingId = null;
      },
      error: (err) => {
        console.error('Error al cambiar estado del repuesto', err);
        this.loadingId = null;
      },
    });
  }
  cargarRepuestos() {
    this.cargarRepuestosInactivos();
  }

  mostrarAlerta(mensaje: string) {
    this.alertMessage = mensaje;
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 2000);
  }

  getImagenUrl(imagen: string): string {
    if (!imagen) {
      return 'assets/img/placeholder.png'; // imagen por defecto
    }
    return `http://localhost:3000${imagen}`;
  }
}
