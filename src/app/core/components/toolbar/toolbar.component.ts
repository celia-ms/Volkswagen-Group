import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from 'src/app/app-paths';
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
    private router: Router,
    private overlayContainer: OverlayContainer,
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.languages = this.translation.getLanguages();
    this.selectedLanguage = this.translation.getDisplayLanguage();
  }

  navigateToHome() {
    this.router.navigate([`${paths.dashboard}/`]);
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
