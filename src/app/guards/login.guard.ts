import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.obtenerToken();
    if (token) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
