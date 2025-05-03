import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-okta-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="okta-widget-container">
      <div #widgetContainer></div>
    </div>
  `,
  styles: [`
    .okta-widget-container {
      margin: 0 auto;
      max-width: 400px;
      padding: 20px 0;
    }
  `]
})
export class OktaWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('widgetContainer', { static: false }) widgetContainer!: ElementRef;
  
  widget: any;
  private authService = inject(AuthService);
  private router = inject(Router);
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit() {
    if (!this.isBrowser) return;
    
    // Importe o OktaSignIn dinamicamente apenas no browser
    import('@okta/okta-signin-widget').then((OktaSignInModule) => {
      const OktaSignIn = OktaSignInModule.default;
      
      // Certificar que widgetContainer já está disponível
      setTimeout(() => {
        if (!this.widgetContainer) return;
        
        this.widget = new OktaSignIn({
          el: this.widgetContainer.nativeElement,
          clientId: '0oaoijpj1t9qFm7HC5d7',
          baseUrl: 'https://dev-21512408.okta.com',
          redirectUri: window.location.origin + '/login/callback',
          authParams: {
            pkce: true,
            responseType: ['code'],
            issuer: 'https://dev-21512408.okta.com/oauth2/default',
            display: 'page',
            scopes: ['openid', 'profile', 'email']
          },
          features: {
            registration: true,
            rememberMe: true,
            multiOptionalFactorEnroll: true,
            selfServiceUnlock: true,
            router: true,
          },
          i18n: {
            pt: {
              'primaryauth.title': 'Faça login na sua conta',
              // Adicione outras traduções conforme necessário
            }
          },
          language: 'pt'
        });

        this.widget.showSignInToGetTokens({
          el: this.widgetContainer.nativeElement,
          scopes: ['openid', 'profile', 'email']
        }).then((tokens: any) => {
          this.widget.remove();
          
          if (tokens) {
            this.authService.handleWidgetTokens(tokens);
            this.router.navigate(['/']);
          }
        }).catch((error: any) => {
          console.error('Error in widget.showSignInToGetTokens:', error);
        });
      }, 0);
    });
  }
  
  ngOnDestroy() {
    if (this.isBrowser && this.widget) {
      this.widget.remove();
    }
  }
}
