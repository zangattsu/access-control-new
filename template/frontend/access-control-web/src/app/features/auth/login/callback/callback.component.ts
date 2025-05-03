import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Processando login...</div>',
})
export class CallbackComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.handleAuthentication();
  }
}
