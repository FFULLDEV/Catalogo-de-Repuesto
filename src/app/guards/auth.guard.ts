import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.obtenerToken();
    if (token) {
      return true; // tiene token, entra al dashboard
    } else {
      this.router.navigate(['/login']);
      return false; // no tiene token, redirigir al login
    }
  }
}

