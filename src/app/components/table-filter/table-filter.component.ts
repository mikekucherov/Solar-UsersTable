import {Component, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  isFiltersVisible = false;

  rangeValue = [10, 50];

  @Output() filtersValueChange$ = new BehaviorSubject({
    search: '',
    ageRange: []
  });

  constructor() { }

  ngOnInit(): void {
  }

  // onAfterChange(value: number[] | number): void {
  //   console.log(`onAfterChange: ${value}`);
  // }

  updateFilters(field, value, currentFiltersValue) {
    currentFiltersValue[field] = value;
    this.filtersValueChange$.next(currentFiltersValue);
    console.log(this.filtersValueChange$.getValue());
  }

  resetFilters() {
    this.filtersValueChange$.next({
      search: '',
      ageRange: []
    });
  }

}
