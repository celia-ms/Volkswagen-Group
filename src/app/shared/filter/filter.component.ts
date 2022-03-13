import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Filter } from 'src/app/core/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input('fields') fields: any[] = [];

  @Output() searchChangeClick = new EventEmitter();
  @Output() sortChangeClick = new EventEmitter();

  isOrderAsc = true;

  filter: Filter = {
    id: 1,
    field: '',
    search: '',
    order: 'asc',
  };

  constructor() {}

  ngOnInit(): void {}

  searchChange() {
    this.searchChangeClick.emit(this.filter.search);
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
    this.searchChangeClick.emit(this.filter.search);
  }

  onKeyup() {
    if (this.filter.search === '') {
      this.sortChangeClick.emit(this.filter);
    }
  }

  onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.searchChangeClick.emit(this.filter.search);
    }
  }
}
