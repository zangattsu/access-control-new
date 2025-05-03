import { OktaAuthOptions } from '@okta/okta-auth-js';

export const oktaAuthConfig: OktaAuthOptions = {
  // Configurações do Okta Auth
  // url: 'https://dev-67094057.okta.com/oauth2/default', // URL do servidor de autorização Okta  
  issuer: 'https://dev-21512408.okta.com/oauth2/default',
  clientId: '0oaoijpj1t9qFm7HC5d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email']
};