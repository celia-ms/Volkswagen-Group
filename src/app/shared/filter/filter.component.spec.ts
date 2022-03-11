import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.filter = {
      id: 0,
      search: 'Golf',
      field: 'modelo',
      order: 'asc',
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('change functions', () => {
    describe('searchChange function', () => {
      it('should have searchChange function', () => {
        expect(component.searchChange).toBeTruthy();
      });

      it('should emit an event when the search change and the value returns will be equal to the search', () => {
        let newSearch = '';
        component.filter.search = 'Golf';

        component.searchChangeClick.subscribe((search) => {
          newSearch = search;
        });

        component.searchChange();

        expect(newSearch).toEqual(component.filter.search);
      });
    });

    describe('sortChange function', () => {
      it('should have sortChange function', () => {
        expect(component.sortChange).toBeTruthy();
      });

      it('should emit an event when the sort changes and the value returns will be equal to the applied filters', () => {
        let newFilter = {};

        component.sortChangeClick.subscribe((filter) => {
          newFilter = filter;
        });

        component.sortChange();

        expect(newFilter).toEqual(component.filter);
      });
    });

    describe('orderChange function', () => {
      it('should have orderChange function', () => {
        expect(component.orderChange).toBeTruthy();
      });

      it('should emit an event when the order changes and the value returns will be equal to the applied filters', () => {
        let newFilter = {};

        component.filter.order = 'desc';

        component.sortChangeClick.subscribe((filter) => {
          newFilter = filter;
        });

        component.orderChange(new Event('click'));

        expect(newFilter).toEqual(component.filter);
      });
    });
  });

  describe('clear functions', () => {
    describe('searchClear function', () => {
      it('should have searchClear function', () => {
        expect(component.searchClear).toBeTruthy();
      });

      it('should emit an event when the search is clear and the value returns of search is empty', () => {
        component.sortChangeClick.subscribe((filter) => {
          component.filter = filter;
        });

        component.searchClear();

        expect(component.filter.search).toEqual('');
      });
    });

    describe('sortClear function', () => {
      it('should have sortClear function', () => {
        expect(component.sortClear).toBeTruthy();
      });

      it('should emit an event when the sort is clear and the value returns of field is empty and order asc', () => {
        component.searchChangeClick.subscribe((search) => {
          component.filter.search = search;
        });

        component.sortClear(new Event('click'));

        expect(component.filter.field).toBe('');
        expect(component.filter.order).toBe('asc');
      });
    });
  });
});
