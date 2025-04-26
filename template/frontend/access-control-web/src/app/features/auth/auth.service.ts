import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth, OktaAuthOptions } from "@okta/okta-auth-js";
import { oktaAuthConfig } from "./auth.config";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private router = inject(Router);
    private oktaAuth: OktaAuth;

    isAuthenticated = signal<boolean>(false);
    userInfo = signal<any>(null);

    constructor() {
        this.oktaAuth = new OktaAuth(oktaAuthConfig);
        this.checkAuthStatus();
    }

    async checkAuthStatus() {
        const authenticated = await this.oktaAuth.isAuthenticated();
        this.isAuthenticated.set(authenticated);

        if (authenticated) {
            const userInfo = await this.oktaAuth.getUser();
            this.userInfo.set(userInfo);
        }
    }

    async login() {
        this.oktaAuth.signInWithRedirect();
    }

    async handleAuthentication() {
        try {
            const tokenResponse = await this.oktaAuth.token.parseFromUrl();
            this.oktaAuth.tokenManager.setTokens(tokenResponse.tokens);
            await this.checkAuthStatus();
            this.router.navigate(['/']);
        } catch (error) {
            console.error('Error handling authentication:', error);
        }
    }

    async logout() {
        await this.oktaAuth.signOut();
        this.isAuthenticated.set(false);
        this.userInfo.set(null);
        this.router.navigate(['/']);
    }
}