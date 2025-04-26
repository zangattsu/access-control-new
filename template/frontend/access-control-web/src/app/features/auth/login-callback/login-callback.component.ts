import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-callback',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Processando login...</div>',
})
export class LoginCallbackComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.handleAuthentication();
  }
}
