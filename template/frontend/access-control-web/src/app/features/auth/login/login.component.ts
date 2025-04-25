import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  template: `<p>Processando login...</p>`,
  // Removed invalid imports array
})
export class LoginComponent implements OnInit {
  constructor(private oktaAuth: OktaAuthStateService) {}

  ngOnInit(): void {
    //this.oktaAuth.handleLoginRedirect();
  }
}
