import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {

  repuestos: any[] = [];
  loadingId: number | null = null;

  // Crear producto
  showCreateModal = false;
  loadingCrear = false;
  productoCreado = false;

  // Editar producto
  showEditModal = false;
  repuestoEditando: any = null;
  loadingEditar = false;
  productoEditado = false;

  // Alerta
  showAlert = false;
  alertMessage = '';

  nuevoRepuesto: any = {
    nombre: '',
    marca: '',
    descripcion: '',
    precio: 0,
    imagen: null,
    activo: true
  };

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRepuestos();
  }

  cargarRepuestos() {
    this.http.get<any[]>('http://localhost:3000/repuestos').subscribe({
      next: (data) => this.repuestos = data,
      error: (err) => console.error('Error cargando repuestos', err)
    });
  }

  // Activar / Desactivar
  deshabilitarRepuesto(id: number) {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.loadingId = id;
    this.http.patch(`http://localhost:3000/repuestos/${id}/deshabilitar`, {})
      .subscribe({
        next: () => {
          this.loadingId = null;
          this.mostrarAlerta('Repuesto deshabilitado');
          this.cargarRepuestos();
        },
        error: (err) => {
          console.error('Error deshabilitando repuesto', err);
          this.loadingId = null;
        }
      });
  }

  activarRepuesto(id: number) {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.loadingId = id;
    this.http.patch(`http://localhost:3000/repuestos/${id}/activar`, {})
      .subscribe({
        next: () => {
          this.loadingId = null;
          this.mostrarAlerta('Repuesto activado');
          this.cargarRepuestos();
        },
        error: (err) => {
          console.error('Error activando repuesto', err);
          this.loadingId = null;
        }
      });
  }

  toggleRepuesto(repuesto: any) {
  if (repuesto.activo) {
    this.deshabilitarRepuesto(repuesto.id);
  } else {
    this.activarRepuesto(repuesto.id);
  }
}


  // Crear
  openCreateModal() {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.nuevoRepuesto = { nombre: '', marca: '', descripcion: '', precio: 0, imagen: null, activo: true };
  }

  crearProducto() {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.loadingCrear = true;

    const formData = new FormData();
    formData.append('nombre', this.nuevoRepuesto.nombre);
    formData.append('marca', this.nuevoRepuesto.marca);
    formData.append('descripcion', this.nuevoRepuesto.descripcion);
    formData.append('precio', this.nuevoRepuesto.precio.toString());
    if (this.nuevoRepuesto.imagen) {
      formData.append('imagen', this.nuevoRepuesto.imagen);
    }

    this.http.post('http://localhost:3000/repuestos', formData).subscribe({
      next: () => {
        this.productoCreado = true;
        this.mostrarAlerta('Producto creado correctamente');
        setTimeout(() => {
          this.loadingCrear = false;
          this.productoCreado = false;
          this.closeCreateModal();
          this.cargarRepuestos();
        }, 1200);
      },
      error: (err) => {
        console.error('Error creando producto', err);
        this.loadingCrear = false;
      }
    });
  }

  // Editar
  openEditModal(repuesto: any) {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.repuestoEditando = { ...repuesto };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.repuestoEditando = null;
  }

  editarProducto() {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.loadingEditar = true;

    const formData = new FormData();
    formData.append('nombre', this.repuestoEditando.nombre);
    formData.append('marca', this.repuestoEditando.marca);
    formData.append('descripcion', this.repuestoEditando.descripcion);
    formData.append('precio', this.repuestoEditando.precio.toString());
    if (this.repuestoEditando.imagen) {
      formData.append('imagen', this.repuestoEditando.imagen);
    }

    this.http.put(`http://localhost:3000/repuestos/${this.repuestoEditando.id}`, formData).subscribe({
      next: () => {
        this.productoEditado = true;
        this.mostrarAlerta('Producto actualizado correctamente');
        setTimeout(() => {
          this.loadingEditar = false;
          this.productoEditado = false;
          this.closeEditModal();
          this.cargarRepuestos();
        }, 1200);
      },
      error: (err) => {
        console.error('Error actualizando producto', err);
        this.loadingEditar = false;
      }
    });
  }

  // Imagen
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.nuevoRepuesto.imagen = event.target.files[0];
    }
  }

  onEditFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.repuestoEditando.imagen = event.target.files[0];
    }
  }

  // Alerta con bootstrap
  mostrarAlerta(mensaje: string) {
    this.alertMessage = mensaje;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2000);
  }

  logout() {
    this.authService.eliminarToken();
    this.router.navigate(['/login']).then(() => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    });
  }
}
