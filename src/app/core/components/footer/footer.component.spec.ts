import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        MaterialModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML components', () => {
    it('should show the year', () => {
      component.year = '2021';
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.query(
        By.css('span')
      ).nativeElement;
      expect(element.innerHTML).toContain('2021');
    });

    it('should show the originator', () => {
      component.originator = 'Zoe Montes Gil';
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.query(
        By.css('a')
      ).nativeElement;
      expect(element.innerHTML).toContain('Zoe Montes Gil');
    });
  });
});
