import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.eliminarToken();
    this.router.navigate(['/login']).then(() => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => window.history.go(1);
    });
  }
}
