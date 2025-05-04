import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/">Início</a></li>
        @if (authService.isAuthenticated()) {
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><button (click)="logout()">Logout</button></li>
        } @else {
          <li><a routerLink="/login">Login</a></li>
        }
      </ul>
    </nav>
  `,
})
export class NavComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
