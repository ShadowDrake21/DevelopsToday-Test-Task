import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { IHoliday } from '../models/holiday.interface';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MatListModule, UpperCasePipe, DatePipe],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);
  private route = inject(ActivatedRoute);

  private countryCode: string = '';
  activeYear: number = 2024;

  countryName: string = '';
  holidays$!: Observable<IHoliday[]>;

  private destroy$$ = new Subject<void>();

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.url[1].path;

    this.countriesService
      .getCountryName(this.countryCode)
      .pipe(takeUntil(this.destroy$$))
      .subscribe((name) => (this.countryName = name));

    this.holidays$ = this.countriesService.getPublicHolidaysByYear(
      this.countryCode,
      this.activeYear
    );
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
