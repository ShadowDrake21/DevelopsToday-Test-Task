import { AsyncPipe, JsonPipe, NgFor, SlicePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { ICountry } from '../models/country.interface';
import { RandomCountryPipe } from '../pipes/random-country.pipe';
import { CountriesService } from '../services/countries.service';
import { CountryWidgetComponent } from './components/country-widget/country-widget.component';

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
    CountryWidgetComponent,
    RandomCountryPipe,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);

  private allCountries$!: Observable<ICountry[]>;
  countries$!: Observable<ICountry[]>;
  searchFormControl = new FormControl('');
  private searchSubscription!: Subscription;

  // pagination
  pageSize: number = 10;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.allCountries$ = this.countriesService.getAllCountries();
    this.countries$ = this.allCountries$;

    this.reactiveCountrySearch();
  }

  reactiveCountrySearch() {
    this.searchSubscription = this.searchFormControl.valueChanges
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
        })
      )
      .subscribe((result) => (this.countries$ = of(result)));
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
