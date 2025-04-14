import { OktaAuthOptions } from '@okta/okta-auth-js';

export const oktaAuthConfig: OktaAuthOptions = {
  issuer: 'https://dev-67094057.okta.com/oauth2/default',
  clientId: '0oao9ep7pfvFyPrzU5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true, // Proof Key for Code Exchange (PKCE) - obrigatório para Authorization Code Flow
  responseMode: 'query',
  responseType: 'code'
};