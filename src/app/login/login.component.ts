import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  this.authService.login(this.usuario, this.contrasena).subscribe({
    next: (res) => {
      this.authService.guardarSesion(res.token, { usuario: res.usuario, rol: res.rol });
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.error = err.error?.error || 'Error al iniciar sesión';
    }
  });
}

}