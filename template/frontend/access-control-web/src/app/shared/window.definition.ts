import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowDefinition {
  getWindowDefinition: string | undefined;
  static getWindowDefinition: string;

  constructor() {
    this.getWindowDefinition = this.getWindow().location.origin; // Retorna a origem da janela atual
  }

    getWindow(): any {
        const WINDOW = new InjectionToken<Window>('WindowToken', {
            factory: () => {
              if (typeof window !== 'undefined') {
                this.getWindowDefinition = window.location.origin; // Retorna a origem da janela atual
                return window;
              }
              return new Window(); // does this work?
            },
          });
    }
}
