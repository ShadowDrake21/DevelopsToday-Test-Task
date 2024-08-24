import { inject, Inject, Injectable } from '@angular/core';
import { API_URL_TOKEN } from '../constants/tokens.constants';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../models/country.interface';
import { IHoliday } from '../models/holiday.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);
  constructor(@Inject(API_URL_TOKEN) private apiUrlToken: string) {}

  getAllCountries() {
    return this.http.get<ICountry[]>(`${this.apiUrlToken}/AvailableCountries`);
  }

  getNextPublicHolidays(countryCode: string) {
    return this.http.get<IHoliday[]>(
      `${this.apiUrlToken}/NextPublicHolidays/${countryCode}`
    );
  }

  getPublicHolidaysByYear(countryCode: string, year: number) {
    return this.http.get<IHoliday[]>(
      `${this.apiUrlToken}/PublicHolidays/${year}/${countryCode}`
    );
  }

  getCountryName(countryCode: string) {
    return this.http
      .get<any>(`${this.apiUrlToken}/CountryInfo/${countryCode}`)
      .pipe(map((info) => info.commonName as string));
  }
}
