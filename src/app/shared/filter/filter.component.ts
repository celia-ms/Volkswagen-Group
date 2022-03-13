import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/core/models/filter.model';
import { AppState } from 'src/app/core/store/app.state';
import * as carSelector from 'src/app/features/cars/store/car.selector';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input('fields') fields: any[] = [];

  @Output() searchChangeClick = new EventEmitter();
  @Output() sortChangeClick = new EventEmitter();

  subscriptions = new Subscription();

  isOrderAsc = true;

  filter!: Filter;

  constructor(private store: Store<AppState>) {
    this.subscriptions.add(
      this.store.pipe(select(carSelector.getFilter)).subscribe((filter) => {
        this.filter = { ...filter };
      })
    );
  }

  ngOnInit(): void {}

  searchChange() {
    this.searchChangeClick.emit(this.filter);
  }

  sortChange() {
    this.sortChangeClick.emit(this.filter);
  }

  orderChange(event: Event) {
    event.stopPropagation();
    this.isOrderAsc = !this.isOrderAsc;
    this.filter.order = this.isOrderAsc ? 'asc' : 'desc';
    this.sortChangeClick.emit(this.filter);
  }

  searchClear() {
    this.filter.search = '';
    this.sortChangeClick.emit(this.filter);
  }

  sortClear(event: Event) {
    event.stopPropagation();
    this.filter.field = '';
    this.filter.order = 'asc';
    this.searchChangeClick.emit(this.filter);
  }

  onKeyup() {
    if (this.filter.search === '') {
      this.sortChangeClick.emit(this.filter);
    }
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.searchChangeClick.emit(this.filter);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
