import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <button (click)="login()">Login com Okta</button>
    </div>
  `,
})
export class LoginComponent {
  private authService = inject(AuthService);

  login() {
    this.authService.login();
  }
}
