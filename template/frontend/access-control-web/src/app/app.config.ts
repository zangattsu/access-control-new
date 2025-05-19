import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { OktaAuthInterceptor } from './features/auth/okta-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(ReactiveFormsModule),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OktaAuthInterceptor,
      multi: true
    }
  ],
};
