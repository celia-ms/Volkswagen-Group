import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { paths } from 'src/app/app-paths';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private languages = [
    {
      display: 'languages.es',
      abbreviation: 'es',
      icon: `${paths.image_flags}/es.png`,
    },
    {
      display: 'languages.en',
      abbreviation: 'en',
      icon: `${paths.image_flags}/en.png`,
    },
  ];

  public activeLanguage: any = navigator.language.slice(0, 2);
  public language$ = new BehaviorSubject(this.activeLanguage);

  public displayLanguage: any = this.findLanguage('en');

  constructor(private translate: TranslateService) {}

  init() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.activeLanguage);
    this.displayLanguage = this.findLanguage(this.activeLanguage);
  }

  changeLanguage(language: string) {
    this.activeLanguage = language;
    this.translate.use(language).subscribe((x) => {
      this.language$.next(language);
      this.displayLanguage = this.findLanguage(this.activeLanguage);
    });
  }

  getDisplayLanguage() {
    return this.displayLanguage;
  }

  getLanguages() {
    return this.languages;
  }

  findLanguage(language: string) {
    return this.languages.find((l) => l.abbreviation === language);
  }
}
