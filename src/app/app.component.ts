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
  }

  registryIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
