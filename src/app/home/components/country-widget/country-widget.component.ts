import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

import { ICountry } from '../../../models/country.interface';
import { IHoliday } from '../../../models/holiday.interface';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-country-widget',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, NgIf, RouterLink, DatePipe],
  templateUrl: './country-widget.component.html',
  styleUrl: './country-widget.component.scss',
})
export class CountryWidgetComponent implements OnInit {
  @Input({ required: true }) country!: ICountry;

  private countriesService = inject(CountriesService);

  nextHoliday$!: Observable<IHoliday>;

  ngOnInit(): void {
    this.nextHoliday$ = this.countriesService
      .getNextPublicHolidays(this.country.countryCode)
      .pipe(map(holidays => holidays[0]));
  }
}
