import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { paths } from './app-paths';
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
    this.registryIcon('icon-logo', `${paths.images}/icon-logo.svg`);
    this.registryIcon('icon-fuel', `${paths.image_features}/icon-fuel.svg`);
    this.registryIcon('icon-speed', `${paths.image_features}/icon-speed.svg`);
    this.registryIcon('icon-car', `${paths.image_features}/icon-car.svg`);
    this.registryIcon('icon-oil', `${paths.image_features}/icon-oil.svg`);
    this.registryIcon(
      'icon-starter',
      `${paths.image_features}/icon-starter.svg`
    );
  }

  registryIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
