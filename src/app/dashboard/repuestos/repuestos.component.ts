import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiRepuestosService } from '../../services/api-repuestos.service';

@Component({
  selector: 'app-repuestos',
  standalone: false,
  templateUrl: './repuestos.component.html',
  styleUrl: './repuestos.component.css',
})
export class RepuestosComponent {
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
    activo: true,
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private apiRepuestos: ApiRepuestosService
  ) {}

  ngOnInit(): void {
    this.cargarRepuestos();
  }

  // --------------------------
  // LISTAR REPUESTOS
  // --------------------------
  cargarRepuestos() {
    this.apiRepuestos.getRepuestos().subscribe({
      next: (data) => (this.repuestos = data),
      error: (err) => console.error('Error cargando repuestos', err),
    });
  }

  // --------------------------
  // CAMBIAR ESTADO (activar/desactivar)
  // --------------------------
  toggleRepuesto(id: number) {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }

    this.loadingId = id;

    this.apiRepuestos.toggleRepuesto(id).subscribe({
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

  // --------------------------
  // CREAR PRODUCTO
  // --------------------------
  openCreateModal() {
    if (!this.authService.isAdmin()) {
      this.mostrarAlerta('No tienes permisos');
      return;
    }
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.nuevoRepuesto = {
      nombre: '',
      marca: '',
      descripcion: '',
      precio: 0,
      imagen: null,
      activo: true,
    };
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

    this.apiRepuestos.crearRepuesto(formData).subscribe({
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
        this.mostrarAlerta('Error al crear el producto');
      },
    });
  }

  // --------------------------
  // EDITAR PRODUCTO
  // --------------------------
  openEditModal(repuesto: any) {
    const user = this.authService.obtenerUsuario();
    if (!user || !this.authService.isAdmin()) {
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
    if (this.repuestoEditando.imagen instanceof File) {
      formData.append('imagen', this.repuestoEditando.imagen);
    }

    this.apiRepuestos
      .actualizarRepuesto(this.repuestoEditando.id, formData)
      .subscribe({
        next: () => {
          this.productoEditado = true;
          this.mostrarAlerta('Producto actualizado correctamente');
          setTimeout(() => {
            this.loadingEditar = false;
            this.productoEditado = false;
            this.cargarRepuestos();
            this.closeEditModal();
          }, 1200);
        },
        error: (err) => {
          console.error('Error actualizando producto', err);
          this.loadingEditar = false;
          this.mostrarAlerta('Error al actualizar producto');
        },
      });
  }

  // --------------------------
  // MANEJO DE IMÁGENES
  // --------------------------
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

  // --------------------------
  // ALERTAS
  // --------------------------
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
