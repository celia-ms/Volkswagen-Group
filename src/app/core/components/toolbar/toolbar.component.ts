import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  selectedLanguage!: any;

  languages: any = [];

  isDark = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.languages = this.translation.getLanguages();
    this.selectedLanguage = this.translation.getDisplayLanguage();
  }

  changeLanguage() {
    this.translation.changeLanguage(this.selectedLanguage.abbreviation);
  }

  changeMode() {
    const darkTheme = 'dark-theme';
    const body = document.getElementsByTagName('body')[0];
    this.isDark = !this.isDark;
    if (this.isDark) {
      body.classList.add(darkTheme);
      this.overlayContainer.getContainerElement().classList.add(darkTheme);
    } else {
      body.classList.remove(darkTheme);
      this.overlayContainer.getContainerElement().classList.remove(darkTheme);
    }
  }
}
