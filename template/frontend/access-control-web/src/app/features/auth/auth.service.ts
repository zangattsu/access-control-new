// auth.service.ts (correção para SSG)
import { Injectable, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private oktaAuth: OktaAuth | null = null;
  private isBrowser: boolean;

  isAuthenticated = signal<boolean>(false);
  userInfo = signal<any>(null);
  loginError = signal<string | null>(null);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Inicializa Okta Auth apenas no navegador
    if (this.isBrowser) {
      const config: OktaAuthOptions = {
        issuer: 'https://dev-21512408.okta.com/oauth2/default',
        clientId: '0oaoijpj1t9qFm7HC5d7',
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile', 'email'],
      };

      this.oktaAuth = new OktaAuth(config);
      this.checkAuthStatus();
    }
  }

  async checkAuthStatus() {
    if (!this.isBrowser || !this.oktaAuth) return;

    const authenticated = await this.oktaAuth.isAuthenticated();
    this.isAuthenticated.set(authenticated);
    if (authenticated) {
      const user = await this.oktaAuth.getUser();
      this.userInfo.set(user);
    }
  }

  async login() {
    if (!this.isBrowser || !this.oktaAuth) return;
    await this.oktaAuth.signInWithRedirect();
  }

  async handleAuthentication() {
    if (!this.isBrowser || !this.oktaAuth) return;

    try {
      const tokenResponse = await this.oktaAuth.token.parseFromUrl();
      this.oktaAuth.tokenManager.setTokens(tokenResponse.tokens);
      await this.checkAuthStatus();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error handling authentication:', error);
      this.loginError.set('Falha ao processar autenticação');
    }
  }

  async handleWidgetTokens(tokens: any) {
    if (!this.isBrowser || !this.oktaAuth) return false;

    try {
      this.oktaAuth.tokenManager.setTokens(tokens);
      await this.checkAuthStatus();
      return true;
    } catch (error) {
      console.error('Error handling widget tokens:', error);
      this.loginError.set('Falha ao processar tokens');
      return false;
    }
  }

  async loginWithCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    if (!this.isBrowser || !this.oktaAuth) return false;

    try {
      this.loginError.set(null);

      const transaction = await this.oktaAuth.signInWithCredentials({
        username,
        password,
      });

      if (transaction.status === 'SUCCESS') {
        await this.oktaAuth.token.getWithRedirect({
          sessionToken: transaction.sessionToken,
        });
        return true;
      } else {
        this.loginError.set(`Status de autenticação: ${transaction.status}`);
        return false;
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
      this.loginError.set(
        error instanceof Error ? error.message : 'Erro de autenticação'
      );
      return false;
    }
  }

  async logout() {
    if (!this.isBrowser || !this.oktaAuth) return;

    await this.oktaAuth.signOut();
    this.isAuthenticated.set(false);
    this.userInfo.set(null);
  }

  getUser(): Promise<any> {
    return this.oktaAuth!.getUser();
  }

  getAccessToken(): Promise<string> {
    const token = this.oktaAuth!.getAccessToken();
    return token ? Promise.resolve(token) : Promise.reject('Access token is undefined');
  }
}
