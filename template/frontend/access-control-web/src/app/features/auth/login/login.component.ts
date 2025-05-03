import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public authService = inject(AuthService);
  private fb = inject(FormBuilder);
  
  isLoading = false;
  
  constructor() { 
    // Mantendo a opção de redirecionar diretamente para o Okta
    this.authService.login();
  }  
 
  loginWithOkta() {
    // Mantendo a opção de redirecionar diretamente para o Okta
    this.authService.login();
  }
}