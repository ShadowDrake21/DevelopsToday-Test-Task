import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  Observable,
  of,
  pipe,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ICountry } from '../models/country.interface';
import { AsyncPipe, JsonPipe, SlicePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    RouterLink,
    MatPaginatorModule,
    SlicePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);

  private allCountries$!: Observable<ICountry[]>;
  countries$!: Observable<ICountry[]>;
  searchFormControl = new FormControl('');
  private subscriptions: Subscription[] = [];

  // pagination
  pageSize: number = 10;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.allCountries$ = this.countriesService.getAllCountries();
    this.countries$ = this.allCountries$;

    this.reactiveCountrySearch();
  }

  reactiveCountrySearch() {
    const searchSubscribe = this.searchFormControl.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          if (!searchTerm || searchTerm.length === 0) {
            return this.allCountries$;
          } else {
            return this.allCountries$.pipe(
              map((countries) =>
                countries.filter((country) =>
                  country.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
            );
          }
        }),
        tap(() => {
          this.pageIndex = 0;
          this.pageSize = 10;
        })
      )
      .subscribe((result) => (this.countries$ = of(result)));

    this.subscriptions.push(searchSubscribe);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
