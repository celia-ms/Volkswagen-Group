import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private translation: TranslationService
  ) {
    this.translation.init();
    this.loadCustomIcons();
  }

  loadCustomIcons() {
    this.registryIcon('icon-logo', '../assets/img/icon-logo.svg');
    this.registryIcon('icon-fuel', '../assets/img/cars/features/icon-fuel.svg');
    this.registryIcon(
      'icon-speed',
      '../assets/img/cars/features/icon-speed.svg'
    );
    this.registryIcon('icon-car', '../assets/img/cars/features/icon-car.svg');
    this.registryIcon('icon-oil', '../assets/img/cars/features/icon-oil.svg');
    this.registryIcon(
      'icon-starter',
      '../assets/img/cars/features/icon-starter.svg'
    );
  }

  registryIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
