import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

import { IHoliday } from '../models/holiday.interface';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, MatListModule, UpperCasePipe, DatePipe],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);
  private route = inject(ActivatedRoute);

  private countryCode: string = '';
  activeYear$$ = new BehaviorSubject<number>(new Date().getFullYear());

  countryName: string = '';
  holidays$!: Observable<IHoliday[]>;

  years: number[] = Array.from({ length: 11 }, (_, i) => 2020 + i);

  private destroy$$ = new Subject<void>();

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.url[1].path;
    this.fetchCountryName();
    this.fetchHolidaysByYear();
  }

  fetchCountryName() {
    this.countriesService
      .getCountryName(this.countryCode)
      .pipe(takeUntil(this.destroy$$))
      .subscribe((name) => (this.countryName = name));
  }

  updateYear(newYear: number) {
    this.activeYear$$.next(newYear);
  }

  fetchHolidaysByYear() {
    this.holidays$ = this.activeYear$$.pipe(
      switchMap((year) =>
        this.countriesService.getPublicHolidaysByYear(this.countryCode, year)
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
