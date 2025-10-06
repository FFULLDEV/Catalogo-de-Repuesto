import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.user);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
